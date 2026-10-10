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
      // Add your table types here when you create them in Supabase
      // Example:
      // projects: {
      //   Row: {
      //     id: string
      //     name: string
      //     description: string
      //     repo_link: string
      //     image: string
      //     tags: string[]
      //     category: 'fullstack' | 'ds-ai-ml' | 'hardware-cv'
      //     created_at: string
      //   }
      //   Insert: {
      //     id?: string
      //     name: string
      //     description: string
      //     repo_link: string
      //     image: string
      //     tags: string[]
      //     category: 'fullstack' | 'ds-ai-ml' | 'hardware-cv'
      //     created_at?: string
      //   }
      //   Update: {
      //     id?: string
      //     name?: string
      //     description?: string
      //     repo_link?: string
      //     image?: string
      //     tags?: string[]
      //     category?: 'fullstack' | 'ds-ai-ml' | 'hardware-cv'
      //     created_at?: string
      //   }
      // }
      // skills: { ... }
      // certifications: { ... }
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
