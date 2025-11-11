'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { generateReportAction, type FormState } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, BotMessageSquare, Loader2, ListOrdered } from 'lucide-react';
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

const initialState: FormState = {
  message: '',
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Generating...
        </>
      ) : (
        'Generate Report'
      )}
    </Button>
  );
}

export function ReportGenerator() {
  const [state, formAction] = useFormState(generateReportAction, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.message && !state.error) {
      toast({
        title: 'Success',
        description: state.message,
      });
    } else if (state.message && state.error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: state.message,
      });
    }
  }, [state, toast]);

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div>
        <form action={formAction}>
          <Card>
            <CardHeader>
              <CardTitle>Input Notes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                name="text"
                placeholder="Paste doctor's notes, research papers, or any unstructured text here..."
                className="min-h-[300px] text-base"
              />
              {state.error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{state.message}</AlertDescription>
                </Alert>
              )}
              <SubmitButton />
            </CardContent>
          </Card>
        </form>
      </div>

      <div className="space-y-8">
        <Card className="min-h-[150px]">
          <CardHeader className="flex flex-row items-center gap-2">
             <BotMessageSquare className="h-6 w-6 text-primary" />
            <CardTitle>AI Summary</CardTitle>
          </CardHeader>
          <CardContent>
            {state.data?.summary ? (
              <p className="text-muted-foreground">{state.data.summary}</p>
            ) : (
              <p className="text-center text-muted-foreground">
                The generated summary will appear here.
              </p>
            )}
          </CardContent>
        </Card>
        <Card className="min-h-[150px]">
          <CardHeader className="flex flex-row items-center gap-2">
             <ListOrdered className="h-6 w-6 text-primary" />
            <CardTitle>Key Points</CardTitle>
          </CardHeader>
          <CardContent>
            {state.data?.keyPoints ? (
              <div
                className="prose prose-sm dark:prose-invert text-muted-foreground"
                dangerouslySetInnerHTML={{
                  __html: state.data.keyPoints.replace(/\n/g, '<br />'),
                }}
              />
            ) : (
              <p className="text-center text-muted-foreground">
                Key points will be extracted and displayed here.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
