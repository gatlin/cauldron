interface SubmitEditDto {
  document_id: string;
  operation: string; // stringified json
  base_revision: number;
  sender_id: string;
}

export { SubmitEditDto };
