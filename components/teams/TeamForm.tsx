"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { TeamFormData } from '@/lib/types/team';
import { createTeam } from '@/lib/services/team-service';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  name: z.string().min(2, 'Team name must be at least 2 characters'),
  won: z.number().min(0).default(0),
  lost: z.number().min(0).default(0),
  tied: z.number().min(0).default(0),
  nrr: z.number().min(-5).max(5).default(0),
});

interface TeamFormProps {
  onSuccess: () => void;
}

export default function TeamForm({ onSuccess }: TeamFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<TeamFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      won: 0,
      lost: 0,
      tied: 0,
      nrr: 0,
    },
  });

  async function onSubmit(data: TeamFormData) {
    try {
      setIsSubmitting(true);
      await createTeam(data);
      toast({
        title: 'Success',
        description: 'Team has been added successfully',
      });
      form.reset();
      onSuccess();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to add team',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Team Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="won"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Wins</FormLabel>
                <FormControl>
                  <Input type="number" {...field} onChange={e => field.onChange(Number(e.target.value))} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="lost"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Losses</FormLabel>
                <FormControl>
                  <Input type="number" {...field} onChange={e => field.onChange(Number(e.target.value))} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="tied"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ties</FormLabel>
                <FormControl>
                  <Input type="number" {...field} onChange={e => field.onChange(Number(e.target.value))} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="nrr"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Net Run Rate</FormLabel>
                <FormControl>
                  <Input type="number" step="0.001" {...field} onChange={e => field.onChange(Number(e.target.value))} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Adding Team...' : 'Add Team'}
        </Button>
      </form>
    </Form>
  );
}