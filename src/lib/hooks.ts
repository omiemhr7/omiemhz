import { supabase } from '@/lib/supabase';
import type {
  Standard,
  Evidence,
  Initiative,
  TechTool,
  Course,
  StudentWork,
  TeacherProfile,
} from '@/lib/types';
import { ADMIN_EMAIL } from '@/lib/types';
import { useState, useEffect, useCallback } from 'react';

export function useTeacherProfile() {
  const [profile, setProfile] = useState<TeacherProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('teacher_profile')
      .select('*')
      .limit(1)
      .maybeSingle()
      .then(({ data }) => {
        setProfile(data);
        setLoading(false);
      });
  }, []);

  return { profile, setProfile, loading };
}

export function useStandards() {
  const [standards, setStandards] = useState<Standard[]>([]);
  const [loading, setLoading] = useState(true);

  const fetch = useCallback(() => {
    supabase
      .from('standards')
      .select('*')
      .order('sort_order', { ascending: true })
      .then(({ data }) => {
        setStandards(data || []);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { standards, setStandards, loading, refetch: fetch };
}

export function useStandardsAdmin() {
  const [standards, setStandards] = useState<Standard[]>([]);
  const [loading, setLoading] = useState(true);

  const fetch = useCallback(async () => {
    const { data } = await supabase
      .from('standards')
      .select('*')
      .order('sort_order', { ascending: true });
    setStandards(data || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { standards, setStandards, loading, refetch: fetch };
}

export function useStandard(id: string | undefined) {
  const [standard, setStandard] = useState<Standard | null>(null);
  const [evidence, setEvidence] = useState<Evidence[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }
    Promise.all([
      supabase.from('standards').select('*').eq('id', id).maybeSingle(),
      supabase
        .from('evidence_standards')
        .select('evidence_id')
        .eq('standard_id', id)
        .then(({ data: links }) => {
          if (!links || links.length === 0) return [] as Evidence[];
          const ids = links.map((l) => l.evidence_id);
          return supabase
            .from('evidence')
            .select('*')
            .in('id', ids)
            .eq('is_published', true)
            .order('created_at', { ascending: false })
            .then(({ data: ev }) => (ev || []) as Evidence[]);
        }),
    ]).then(([stdRes, evRes]) => {
      setStandard(stdRes.data);
      setEvidence(evRes as Evidence[]);
      setLoading(false);
    });
  }, [id]);

  return { standard, evidence, loading, setEvidence };
}

export function useEvidence() {
  const [evidence, setEvidence] = useState<Evidence[]>([]);
  const [loading, setLoading] = useState(true);

  const fetch = useCallback(() => {
    supabase
      .from('evidence')
      .select('*')
      .eq('is_published', true)
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        setEvidence(data || []);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { evidence, setEvidence, loading, refetch: fetch };
}

export function useEvidenceAdmin() {
  const [evidence, setEvidence] = useState<Evidence[]>([]);
  const [loading, setLoading] = useState(true);

  const fetch = useCallback(() => {
    supabase
      .from('evidence')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        setEvidence(data || []);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { evidence, setEvidence, loading, refetch: fetch };
}

export function useInitiatives() {
  const [initiatives, setInitiatives] = useState<Initiative[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('initiatives')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        setInitiatives(data || []);
        setLoading(false);
      });
  }, []);

  return { initiatives, setInitiatives, loading };
}

export function useTechTools() {
  const [tools, setTools] = useState<TechTool[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('tech_tools')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        setTools(data || []);
        setLoading(false);
      });
  }, []);

  return { tools, setTools, loading };
}

export function useCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('courses')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        setCourses(data || []);
        setLoading(false);
      });
  }, []);

  return { courses, setCourses, loading };
}

export function useStudentWorks() {
  const [works, setWorks] = useState<StudentWork[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('student_works')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        setWorks(data || []);
        setLoading(false);
      });
  }, []);

  return { works, setWorks, loading };
}

export function useAuth() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, sess) => {
      setSession(sess);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const isAdmin = !!session?.user && session.user.email === ADMIN_EMAIL;

  return { session, loading, isAdmin };
}
