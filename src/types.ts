export interface JobPostingAnalysis {
  hardSkills: string[];
  softSkills: string[];
  cultureKeywords: string[];
  summary: string;
}

export interface CandidateStrengthOrGap {
  title: string;
  description: string;
  mappingEvidence: string;
}

export interface CandidateAnalysis {
  strengths: CandidateStrengthOrGap[];
  gaps: CandidateStrengthOrGap[];
  summary: string;
}

export interface ScoringWeights {
  experience: number;
  techSkill: number;
  orgFit: number;
  communication: number;
  growth: number;
}

export interface ScoringScores {
  experience: number;
  techSkill: number;
  orgFit: number;
  communication: number;
  growth: number;
}

export interface ScoringEvidence {
  experience: string;
  techSkill: string;
  orgFit: string;
  communication: string;
  growth: string;
}

export interface Scoring {
  isWeightAdjusted: boolean;
  weightAdjustReason: string;
  weights: ScoringWeights;
  scores: ScoringScores;
  evidence: ScoringEvidence;
  totalScore: number;
}

export interface SelfIntroFeedback {
  hasLeadStatement: boolean;
  relevance: string;
  critique: string;
  improvedScript: string;
}

export interface InterviewQuestion {
  question: string;
  category: string;
  starGuide: string;
  sampleAnswer?: string;
}

export interface AnalysisResult {
  jobPostingAnalysis: JobPostingAnalysis;
  candidateAnalysis: CandidateAnalysis;
  scoring: Scoring;
  selfIntroFeedback: SelfIntroFeedback;
  interviewQuestions: InterviewQuestion[];
}
