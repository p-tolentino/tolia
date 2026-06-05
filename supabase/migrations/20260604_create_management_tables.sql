-- Announcements
CREATE TABLE IF NOT EXISTS public.announcements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  author_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  is_published boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read published announcements"
  ON public.announcements FOR SELECT
  TO authenticated
  USING (is_published = true OR author_id = auth.uid());

CREATE POLICY "Manage roles can manage announcements"
  ON public.announcements FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.agents
      WHERE id = auth.uid() AND role IN ('System Admin', 'Branch Manager', 'BM Assistant')
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.agents
      WHERE id = auth.uid() AND role IN ('System Admin', 'Branch Manager', 'BM Assistant')
    )
  );

-- Route Documents (for the file management CMS)
CREATE TABLE IF NOT EXISTS public.route_documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  route_path text NOT NULL,
  label text NOT NULL,
  file_name text,
  file_type text NOT NULL DEFAULT 'pdf',
  file_url text,
  storage_path text,
  uploaded_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.route_documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read route documents"
  ON public.route_documents FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Manage roles can manage route documents"
  ON public.route_documents FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.agents
      WHERE id = auth.uid() AND role IN ('System Admin', 'Branch Manager', 'BM Assistant')
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.agents
      WHERE id = auth.uid() AND role IN ('System Admin', 'Branch Manager', 'BM Assistant')
    )
  );

-- Fix existing calendar_events RLS to use correct role names
DROP POLICY IF EXISTS "Admins can manage all events" ON public.calendar_events;
CREATE POLICY "Manage roles can manage events"
  ON public.calendar_events FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.agents
      WHERE id = auth.uid() AND role IN ('System Admin', 'Branch Manager', 'BM Assistant')
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.agents
      WHERE id = auth.uid() AND role IN ('System Admin', 'Branch Manager', 'BM Assistant')
    )
  );

-- Fix event_attachments RLS
DROP POLICY IF EXISTS "Admins can manage all attachments" ON public.event_attachments;
CREATE POLICY "Manage roles can manage attachments"
  ON public.event_attachments FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.agents
      WHERE id = auth.uid() AND role IN ('System Admin', 'Branch Manager', 'BM Assistant')
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.agents
      WHERE id = auth.uid() AND role IN ('System Admin', 'Branch Manager', 'BM Assistant')
    )
  );

-- Fix recurring_event_exceptions RLS
DROP POLICY IF EXISTS "Admins can manage all exceptions" ON public.recurring_event_exceptions;
CREATE POLICY "Manage roles can manage exceptions"
  ON public.recurring_event_exceptions FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.agents
      WHERE id = auth.uid() AND role IN ('System Admin', 'Branch Manager', 'BM Assistant')
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.agents
      WHERE id = auth.uid() AND role IN ('System Admin', 'Branch Manager', 'BM Assistant')
    )
  );
