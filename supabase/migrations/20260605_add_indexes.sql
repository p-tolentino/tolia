-- Performance indexes for dashboard queries
CREATE INDEX IF NOT EXISTS idx_route_documents_route_path ON public.route_documents(route_path);
CREATE INDEX IF NOT EXISTS idx_calendar_events_date ON public.calendar_events(date);
CREATE INDEX IF NOT EXISTS idx_calendar_events_status ON public.calendar_events(status);
CREATE INDEX IF NOT EXISTS idx_event_attachments_event_id ON public.event_attachments(event_id);
CREATE INDEX IF NOT EXISTS idx_agents_email ON public.agents(email);
CREATE INDEX IF NOT EXISTS idx_agents_role ON public.agents(role);
