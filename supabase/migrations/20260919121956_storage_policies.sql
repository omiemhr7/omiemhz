/*
# Storage policies for evidence-files bucket

Allow public read of evidence files.
Allow authenticated users to upload/manage files.
*/

DROP POLICY IF EXISTS "public_read_evidence_files" ON storage.objects;
CREATE POLICY "public_read_evidence_files" ON storage.objects
  FOR SELECT TO anon, authenticated
  USING (bucket_id = 'evidence-files');

DROP POLICY IF EXISTS "auth_insert_evidence_files" ON storage.objects;
CREATE POLICY "auth_insert_evidence_files" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'evidence-files');

DROP POLICY IF EXISTS "auth_update_evidence_files" ON storage.objects;
CREATE POLICY "auth_update_evidence_files" ON storage.objects
  FOR UPDATE TO authenticated
  USING (bucket_id = 'evidence-files') WITH CHECK (bucket_id = 'evidence-files');

DROP POLICY IF EXISTS "auth_delete_evidence_files" ON storage.objects;
CREATE POLICY "auth_delete_evidence_files" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'evidence-files');
