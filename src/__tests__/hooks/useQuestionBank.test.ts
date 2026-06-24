import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderHook, waitFor, act } from '@testing-library/react';
import { useQuestionBank } from '@/hooks/useQuestionBank';
import { supabase } from '@/integrations/supabase/client';
import { createLogger } from '@/lib/logger';

vi.mock('@/components/layout/LanguageSwitcher', () => ({
  useLanguage: () => ({
    language: 'zh',
    setLanguage: vi.fn(),
    t: (key: string, vars?: Record<string, string | number>) => {
      if (vars) {
        return `${key}:${JSON.stringify(vars)}`;
      }
      return key;
    },
  }),
}));

const createTableBuilder = (data: any[] = []) => {
  const builder: any = {
    select: vi.fn(() => builder),
    order: vi.fn(() => builder),
    then: vi.fn(resolve => resolve({ data, error: null })),
    catch: vi.fn(() => builder),
  };
  return builder;
};

const createThrowBuilder = (error: Error) => {
  const builder: any = {
    select: vi.fn(() => builder),
    order: vi.fn(() => builder),
    then: vi.fn(() => {
      throw error;
    }),
    catch: vi.fn(() => builder),
  };
  return builder;
};

const createRecordingBuilder = (selectData: any[] = []) => {
  const insertMock = vi.fn(() => Promise.resolve({ error: null }));
  const builder: any = {
    select: vi.fn(() => builder),
    insert: insertMock,
    order: vi.fn(() => builder),
    then: vi.fn(resolve => resolve({ data: selectData, error: null })),
    catch: vi.fn(() => builder),
  };
  return { builder, insertMock };
};

const createMockFrom = (options: {
  uploadedFiles?: any[];
  preprocessedFiles?: any[];
  generatedQuestions?: any[];
} = {}) => {
  const {
    uploadedFiles = [],
    preprocessedFiles = [],
    generatedQuestions = [],
  } = options;

  return vi.fn((table: string) => {
    if (table === 'uploaded_files') {
      return createTableBuilder(uploadedFiles);
    }
    if (table === 'preprocessed_files') {
      return createTableBuilder(preprocessedFiles);
    }
    if (table === 'generated_questions') {
      return createTableBuilder(generatedQuestions);
    }
    return createTableBuilder([]);
  });
};

describe('useQuestionBank', () => {
  const loggerMock = {
    info: vi.fn(),
    error: vi.fn(),
    warn: vi.fn(),
    debug: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(createLogger).mockReturnValue(loggerMock);
    (supabase as any).storage = undefined;
    (supabase as any).functions = undefined;
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('fetches uploaded and preprocessed files on mount', async () => {
    const fromMock = createMockFrom({
      uploadedFiles: [
        { id: 'f1', file_name: 'doc.txt', file_path: 'uploads/1_doc.txt' },
      ],
      preprocessedFiles: [
        {
          id: 'p1',
          file_name: 'doc.txt',
          original_file_path: 'uploads/1_doc.txt',
          created_at: '2024-01-01T00:00:00Z',
          model_used: 'gpt-4',
        },
      ],
    });
    supabase.from = fromMock;

    const { result } = renderHook(() => useQuestionBank('room-1'));

    await waitFor(() => expect(result.current.isFilesLoaded).toBe(true));

    expect(fromMock).toHaveBeenCalledWith('uploaded_files');
    expect(fromMock).toHaveBeenCalledWith('preprocessed_files');
    expect(result.current.uploadedFiles).toHaveLength(1);
    expect(result.current.uploadedFiles[0].file_name).toBe('doc.txt');
    expect(result.current.preprocessedFiles).toHaveLength(1);
    expect(result.current.preprocessedFiles[0].id).toBe('p1');
    expect(result.current.isFetchingFiles).toBe(false);
    expect(result.current.error).toBe('');
  });

  it('retries recoverable network errors and clears error on success', async () => {
    vi.useFakeTimers();

    let uploadedCallCount = 0;
    const fromMock = vi.fn((table: string) => {
      if (table === 'uploaded_files') {
        uploadedCallCount += 1;
        if (uploadedCallCount <= 2) {
          return createThrowBuilder(new TypeError('failed to fetch'));
        }
        return createTableBuilder([
          { id: 'f1', file_name: 'doc.txt', file_path: 'uploads/1_doc.txt' },
        ]);
      }
      return createTableBuilder([]);
    });
    supabase.from = fromMock;

    const { result } = renderHook(() => useQuestionBank('room-1'));

    await act(async () => {
      await vi.runAllTimersAsync();
    });

    expect(result.current.uploadedFiles).toHaveLength(1);
    expect(result.current.error).toBe('');
    expect(result.current.isFilesLoaded).toBe(true);
    expect(result.current.isFetchingFiles).toBe(false);
    expect(uploadedCallCount).toBe(3);
  });

  it('stops retrying after max attempts and sets error', async () => {
    vi.useFakeTimers();

    let uploadedCallCount = 0;
    let preprocessedCallCount = 0;

    const fromMock = vi.fn((table: string) => {
      if (table === 'uploaded_files') {
        uploadedCallCount += 1;
        return createThrowBuilder(new TypeError('failed to fetch'));
      }
      if (table === 'preprocessed_files') {
        preprocessedCallCount += 1;
        return createThrowBuilder(new TypeError('failed to fetch'));
      }
      return createTableBuilder([]);
    });
    supabase.from = fromMock;

    const { result } = renderHook(() => useQuestionBank('room-1'));

    await act(async () => {
      await vi.runAllTimersAsync();
    });

    expect(result.current.error).toMatch(
      /judge\.questionBank\.errors\.fetch(Uploaded|Preprocessed)Generic/
    );
    expect(result.current.isFetchingFiles).toBe(false);
    expect(result.current.isFilesLoaded).toBe(false);
    expect(uploadedCallCount).toBe(4);
    expect(preprocessedCallCount).toBe(4);
  });

  it('does not retry business errors from supabase', async () => {
    let uploadedCallCount = 0;
    const fromMock = vi.fn((table: string) => {
      if (table === 'uploaded_files') {
        uploadedCallCount += 1;
        const builder: any = createTableBuilder([]);
        builder.then = vi.fn(resolve =>
          resolve({
            data: null,
            error: { message: 'permission denied', code: '42501' },
          })
        );
        return builder;
      }
      return createTableBuilder([]);
    });
    supabase.from = fromMock;

    renderHook(() => useQuestionBank('room-1'));

    await waitFor(() => expect(loggerMock.error).toHaveBeenCalled());

    expect(uploadedCallCount).toBe(1);
    expect(loggerMock.error).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({ message: 'permission denied' })
    );
  });

  it('uploads file with correct storage path and insert parameters', async () => {
    const recording = createRecordingBuilder([]);
    supabase.from = vi.fn(() => recording.builder);

    const uploadMock = vi.fn(() =>
      Promise.resolve({ data: { path: 'uploads/123_test.txt' }, error: null })
    );
    const storageFromMock = vi.fn(() => ({ upload: uploadMock }));
    (supabase as any).storage = { from: storageFromMock };

    const { result } = renderHook(() => useQuestionBank('room-1'));
    await waitFor(() => expect(result.current.isFilesLoaded).toBe(true));

    const file = new File(['content'], 'test.txt', { type: 'text/plain' });
    const resetInput = vi.fn();

    await act(async () => {
      await result.current.handleFileUpload(file, resetInput);
    });

    expect(storageFromMock).toHaveBeenCalledWith('question-files');
    expect(uploadMock).toHaveBeenCalledWith(
      expect.stringMatching(/^uploads\/\d+_test\.txt$/),
      file,
      { cacheControl: '3600', upsert: false }
    );

    expect(recording.insertMock).toHaveBeenCalledWith({
      file_name: 'test.txt',
      file_path: expect.stringMatching(/^uploads\/\d+_test\.txt$/),
    });
    expect(resetInput).toHaveBeenCalled();
    expect(result.current.isUploading).toBe(false);
  });

  it('calls preprocess edge function with correct parameters', async () => {
    const invokeMock = vi.fn(() =>
      Promise.resolve({ data: { success: true }, error: null })
    );
    (supabase as any).functions = { invoke: invokeMock };

    supabase.from = createMockFrom({
      uploadedFiles: [
        { id: 'f1', file_name: 'doc.txt', file_path: 'uploads/1_doc.txt' },
      ],
    });

    const { result } = renderHook(() => useQuestionBank('room-1'));
    await waitFor(() => expect(result.current.isFilesLoaded).toBe(true));

    act(() => {
      result.current.setSelectedFile('f1');
    });

    await act(async () => {
      await result.current.handlePreprocessFile();
    });

    expect(invokeMock).toHaveBeenCalledWith('preprocess-file', {
      body: {
        filePath: 'uploads/1_doc.txt',
        fileName: 'doc.txt',
        roomId: 'room-1',
      },
    });
  });

  it('calls generate questions edge function with correct parameters', async () => {
    const invokeMock = vi.fn(() =>
      Promise.resolve({ data: { success: true }, error: null })
    );
    (supabase as any).functions = { invoke: invokeMock };

    supabase.from = createMockFrom();

    const { result } = renderHook(() => useQuestionBank('room-1'));
    await waitFor(() => expect(result.current.isFilesLoaded).toBe(true));

    act(() => {
      result.current.setSelectedPreprocessedFile('p1');
    });

    await act(async () => {
      await result.current.handleGenerateQuestions();
    });

    expect(invokeMock).toHaveBeenCalledWith('generate-questions', {
      body: {
        preprocessedId: 'p1',
        questionCount: 18,
        roomId: 'room-1',
      },
    });
  });
});
