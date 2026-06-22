-- Fix the correct_option mapping to match the constraint (0-3 instead of 1-4)
WITH question_data AS (
  SELECT 
    id as generated_questions_id,
    questions,
    file_name
  FROM generated_questions 
  WHERE file_name = '柳州水鱼规则.md'
),
expanded_questions AS (
  SELECT 
    generated_questions_id,
    file_name,
    (json_array_elements(questions::json))::json as question_json
  FROM question_data
)
INSERT INTO questions (
  question,
  option_a,
  option_b,
  option_c,
  option_d,
  correct_option,
  explanation,
  difficulty,
  category,
  generated_questions_id
)
SELECT 
  question_json->>'question' as question,
  question_json->>'option_a' as option_a,
  question_json->>'option_b' as option_b,
  question_json->>'option_c' as option_c,
  question_json->>'option_d' as option_d,
  -- Map A,B,C,D to 0,1,2,3 to match the check constraint
  CASE question_json->>'correct_answer'
    WHEN 'A' THEN 0
    WHEN 'B' THEN 1
    WHEN 'C' THEN 2
    WHEN 'D' THEN 3
    ELSE 0
  END as correct_option,
  question_json->>'explanation' as explanation,
  1 as difficulty,
  '综合题目' as category,
  generated_questions_id
FROM expanded_questions;