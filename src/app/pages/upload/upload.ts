import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { CallRadarService } from '../../services/call-radar-service';

@Component({
  selector: 'app-upload',
  imports: [CommonModule],
  templateUrl: './upload.html',
  styleUrl: './upload.scss',
})
export class Upload {
  private readonly router = inject(Router);
  private readonly callRadarService = inject(CallRadarService);

  audioFile: File | null = null;
  metadataFile: File | null = null;
  metadataText = '';

  isSubmitting = false;
  successMessage = '';
  errorMessage = '';

  onAudioFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const selectedFile = input.files?.[0] ?? null;

    this.successMessage = '';
    this.errorMessage = '';

    if (!selectedFile) {
      this.audioFile = null;
      return;
    }

    const lowerName = selectedFile.name.toLowerCase();
    const isMp3ByName = lowerName.endsWith('.mp3');
    const isMp3ByType = selectedFile.type === 'audio/mpeg' || selectedFile.type === 'audio/mp3';

    if (!isMp3ByName && !isMp3ByType) {
      this.audioFile = null;
      this.errorMessage = 'Please select a valid MP3 audio file.';
      input.value = '';
      return;
    }

    if (this.metadataFile && this.getBaseName(selectedFile.name) !== this.getBaseName(this.metadataFile.name)) {
      this.audioFile = null;
      this.errorMessage = 'Audio and metadata file names must match (excluding extension).';
      input.value = '';
      return;
    }

    this.audioFile = selectedFile;
  }

  private getBaseName(fileName: string): string {
    const lastDotIndex = fileName.lastIndexOf('.');
    const base = lastDotIndex > 0 ? fileName.slice(0, lastDotIndex) : fileName;
    return base.toLowerCase();
  }

  async onMetadataFileChange(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    const selectedFile = input.files?.[0] ?? null;

    this.successMessage = '';
    this.errorMessage = '';
    this.metadataText = '';

    if (!selectedFile) {
      this.metadataFile = null;
      return;
    }

    const lowerName = selectedFile.name.toLowerCase();
    const isJsonByName = lowerName.endsWith('.json');
    const isJsonByType = selectedFile.type === 'application/json' || selectedFile.type === 'text/json';

    if (!isJsonByName && !isJsonByType) {
      this.metadataFile = null;
      this.errorMessage = 'Please select a valid JSON metadata file.';
      input.value = '';
      return;
    }

    if (this.audioFile && this.getBaseName(selectedFile.name) !== this.getBaseName(this.audioFile.name)) {
      this.metadataFile = null;
      this.errorMessage = 'Audio and metadata file names must match (excluding extension).';
      input.value = '';
      return;
    }

    try {
      const rawText = await selectedFile.text();
      const parsed = JSON.parse(rawText);

      if (parsed === null || Array.isArray(parsed) || typeof parsed !== 'object') {
        this.metadataFile = null;
        this.errorMessage = 'Metadata JSON must be an object.';
        input.value = '';
        return;
      }

      this.metadataFile = selectedFile;
      this.metadataText = JSON.stringify(parsed, null, 2);
    } catch {
      this.metadataFile = null;
      this.errorMessage = 'Metadata JSON is invalid and could not be parsed.';
      input.value = '';
    }
  }

  submitUpload(): void {
    this.successMessage = '';
    this.errorMessage = '';

    if (!this.audioFile) {
      this.errorMessage = 'Select an MP3 audio file before submitting.';
      return;
    }

    if (!this.metadataFile || !this.metadataText) {
      this.errorMessage = 'Select a metadata JSON file before submitting.';
      return;
    }

    if (this.getBaseName(this.audioFile.name) !== this.getBaseName(this.metadataFile.name)) {
      this.errorMessage = 'Audio and metadata file names must match (excluding extension).';
      return;
    }

    let metadata: Record<string, unknown>;

    try {
      const parsed = JSON.parse(this.metadataText);

      if (parsed === null || Array.isArray(parsed) || typeof parsed !== 'object') {
        this.errorMessage = 'Metadata JSON must be an object.';
        return;
      }

      metadata = parsed as Record<string, unknown>;
    } catch {
      this.errorMessage = 'Metadata JSON is invalid. Please fix it and try again.';
      return;
    }

    this.isSubmitting = true;

    this.callRadarService
      .uploadCallPackage(this.audioFile, metadata)
      .pipe(finalize(() => (this.isSubmitting = false)))
      .subscribe({
        next: (uploadedCall) => {
          this.successMessage = 'Upload submitted successfully.';
          this.router.navigate(['/calls', uploadedCall.id], {
            state: {
              call: uploadedCall,
            },
          });
        },
        error: () => {
          this.errorMessage = 'Upload failed. Verify the API endpoint and try again.';
        },
      });
  }
}