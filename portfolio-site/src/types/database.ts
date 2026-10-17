export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      projects: {
        Row: {
          id: number
          name: string
          description: string
          repo_link: string
          tags: Json
          category: 'fullstack' | 'ds-ai-ml' | 'hardware-cv'
          image_path: string
          created_at: string
        }
        Insert: {
          id?: number
          name: string
          description: string
          repo_link: string
          tags?: Json
          category: 'fullstack' | 'ds-ai-ml' | 'hardware-cv'
          image_path?: string
          created_at?: string
        }
        Update: {
          id?: number
          name?: string
          description?: string
          repo_link?: string
          tags?: Json
          category?: 'fullstack' | 'ds-ai-ml' | 'hardware-cv'
          image_path?: string
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

export type Project = Database['public']['Tables']['projects']['Row']
