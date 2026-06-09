"use client";

import { useState } from "react";
import Papa from "papaparse";
import { scheduleBulkPosts } from "../actions";
import { ArrowLeft, Upload, FileType, CheckCircle, AlertCircle, Calendar } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function BulkUploadPage() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [parsedData, setParsedData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      Papa.parse(selectedFile, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          setParsedData(results.data);
          setError("");
        },
        error: (err: any) => {
          setError(`Failed to parse CSV: ${err.message}`);
        }
      });
    }
  };

  const handleSchedule = async () => {
    if (parsedData.length === 0) return;
    setLoading(true);
    setError("");

    try {
      const formattedPosts = parsedData.map((row: any) => {
        // Validate headers: Title, Content Pillar, Geo Target, Primary Keyword, Secondary Keywords, Word Count, Publish Date
        const title = row["Title"];
        const publishDateStr = row["Publish Date"];
        if (!title || !publishDateStr) {
          throw new Error("Missing required columns 'Title' or 'Publish Date' in one or more rows.");
        }

        return {
          title: title,
          contentPillar: row["Content Pillar"] || "",
          geoTarget: row["Geo Target"] || "",
          primaryKeyword: row["Primary Keyword"] || "",
          secondaryKeywords: row["Secondary Keywords"] || "",
          wordCount: row["Word Count"] || "1500",
          publishAt: new Date(publishDateStr)
        };
      });

      const results = await scheduleBulkPosts(formattedPosts);
      const failed = results.filter(r => !r.success);
      if (failed.length > 0) {
        setError(`Failed to schedule ${failed.length} posts. First error: ${failed[0].error}`);
      } else {
        setSuccess(true);
        setTimeout(() => {
          router.push("/admin-portal-xyz");
        }, 2000);
      }
    } catch (err: any) {
      setError(err.message || "An error occurred while scheduling.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <div className="flex items-center gap-3 border-b border-white/5 pb-6">
        <Link
          href="/admin-portal-xyz"
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-muted-foreground hover:text-white transition-all"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Calendar className="h-6 w-6 text-primary" />
            Bulk Schedule Posts (CSV)
          </h1>
          <p className="text-xs text-muted-foreground">
            Upload your 30-day editorial calendar to automatically schedule and generate AI content just-in-time.
          </p>
        </div>
      </div>

      <div className="p-8 rounded-2xl glass-panel border border-white/10 space-y-6">
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 text-sm text-primary/80">
          <strong>CSV Format Requirement:</strong> Your CSV must include the following headers exactly (case-sensitive): <br/>
          <code className="bg-black/30 px-2 py-1 rounded text-xs mt-2 inline-block font-mono">Title, Content Pillar, Geo Target, Primary Keyword, Secondary Keywords, Word Count, Publish Date</code>
          <br />
          <span className="text-xs mt-2 block opacity-70">
            *Publish Date format should be recognizable by JavaScript (e.g. <code>2026-06-15 14:00</code> or ISO 8601).
          </span>
        </div>

        <div className="border-2 border-dashed border-white/10 rounded-xl p-10 flex flex-col items-center justify-center text-center hover:border-primary/50 transition-all">
          <input
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            className="hidden"
            id="csv-upload"
          />
          <label htmlFor="csv-upload" className="cursor-pointer flex flex-col items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-white/5 flex items-center justify-center">
              <Upload className="h-8 w-8 text-muted-foreground" />
            </div>
            <div>
              <span className="text-white font-bold block mb-1">Click to Upload CSV</span>
              <span className="text-muted-foreground text-xs">or drag and drop your file here</span>
            </div>
          </label>
        </div>

        {file && (
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileType className="h-6 w-6 text-accent" />
              <div>
                <p className="text-sm font-semibold text-white">{file.name}</p>
                <p className="text-xs text-muted-foreground">{parsedData.length} rows found</p>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="flex gap-2 p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-xs text-destructive">
            <AlertCircle className="h-4.5 w-4.5 flex-shrink-0" />
            <p className="leading-snug">{error}</p>
          </div>
        )}

        {success && (
          <div className="flex gap-2 p-3 rounded-xl bg-green-500/10 border border-green-500/20 text-xs text-green-400">
            <CheckCircle className="h-4.5 w-4.5 flex-shrink-0" />
            <p className="leading-snug">Successfully scheduled {parsedData.length} posts! Redirecting...</p>
          </div>
        )}

        <div className="flex justify-end pt-4">
          <button
            onClick={handleSchedule}
            disabled={!file || parsedData.length === 0 || loading || success}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary hover:bg-primary/95 text-primary-foreground px-6 py-2.5 text-sm font-bold shadow-lg shadow-primary/10 transition-all disabled:opacity-50"
          >
            {loading ? "Scheduling..." : `Schedule ${parsedData.length} Posts`}
          </button>
        </div>
      </div>
    </div>
  );
}
