// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import {
  createClient,
  SupabaseClient,
  AuthResponse,
} from '@supabase/supabase-js';

@Injectable()
export class AuthService {
  private supabase: SupabaseClient;

  constructor() {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_ANON_KEY;
    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Supabase URL or key is not set');
    }
    this.supabase = createClient(supabaseUrl, supabaseKey);
  }

  async signUp(email: string, password: string): Promise<AuthResponse> {
    return await this.supabase.auth.signUp({
      email,
      password,
    });
  }

  async signIn(email: string, password: string): Promise<AuthResponse> {
    return await this.supabase.auth.signInWithPassword({
      email,
      password,
    });
  }

  async signOut(): Promise<{ error: Error | null }> {
    return await this.supabase.auth.signOut();
  }
}
