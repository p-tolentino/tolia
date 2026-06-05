-- Calendar Events
CREATE TABLE IF NOT EXISTS public.calendar_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  date date NOT NULL,
  end_date date,
  start_time text,
  end_time text,
  all_day boolean DEFAULT false,
  location text,
  location_url text,
  event_type text NOT NULL CHECK (event_type IN ('training', 'meeting', 'deadline', 'social', 'exam')),
  status text DEFAULT 'published' CHECK (status IN ('draft', 'published', 'cancelled', 'rescheduled')),
  organizer text,
  is_recurring boolean DEFAULT false,
  recurring_pattern text,
  rrule text,
  registration_url text,
  href text,
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.calendar_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Events are viewable by authenticated users"
  ON public.calendar_events FOR SELECT
  TO authenticated
  USING (status IN ('published', 'rescheduled') OR created_by = auth.uid());

CREATE POLICY "Admins can manage all events"
  ON public.calendar_events FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.agents
      WHERE id = auth.uid() AND role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.agents
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Event Attachments
CREATE TABLE IF NOT EXISTS public.event_attachments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id uuid NOT NULL REFERENCES public.calendar_events(id) ON DELETE CASCADE,
  name text NOT NULL,
  url text NOT NULL,
  type text NOT NULL CHECK (type IN ('pdf', 'doc', 'image', 'link', 'other')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.event_attachments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Attachments are viewable with events"
  ON public.event_attachments FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.calendar_events ce
      WHERE ce.id = event_id AND (ce.status IN ('published', 'rescheduled') OR ce.created_by = auth.uid())
    )
  );

CREATE POLICY "Admins can manage all attachments"
  ON public.event_attachments FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.agents
      WHERE id = auth.uid() AND role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.agents
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Recurring Event Exceptions
CREATE TABLE IF NOT EXISTS public.recurring_event_exceptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id uuid NOT NULL REFERENCES public.calendar_events(id) ON DELETE CASCADE,
  excluded_date date NOT NULL,
  action text NOT NULL CHECK (action IN ('skip', 'modified')),
  modified_title text,
  modified_description text,
  modified_start_time text,
  modified_end_time text,
  modified_location text,
  created_at timestamptz DEFAULT now(),
  UNIQUE (event_id, excluded_date)
);

ALTER TABLE public.recurring_event_exceptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Exceptions are viewable with events"
  ON public.recurring_event_exceptions FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.calendar_events ce
      WHERE ce.id = event_id AND (ce.status IN ('published', 'rescheduled') OR ce.created_by = auth.uid())
    )
  );

CREATE POLICY "Admins can manage all exceptions"
  ON public.recurring_event_exceptions FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.agents
      WHERE id = auth.uid() AND role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.agents
      WHERE id = auth.uid() AND role = 'admin'
    )
  );
