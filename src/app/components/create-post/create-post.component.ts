import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from 'src/app/services/post.service';


@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent {
  postForm: FormGroup;
  selectedImage: File | null = null;

  constructor(private fb: FormBuilder, private postService: PostService) {
    this.postForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      image: [null, Validators.required]
    });
  }

  onImageSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedImage = file;
    }
  }

  submit(): void {
    if (this.postForm.valid && this.selectedImage) {
      const { title } = this.postForm.value;
      this.postService.createPost(title, this.selectedImage).subscribe({
        next: (response) => {
          alert('Post creado');
          this.postForm.reset();
        },
        error: (err) => {
          console.error('Error creando post:', err);
          alert('Failed to create post. Please try again.');
        }
      });
    }
  }
}
