import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface Post {
  id: number;
  title: string;
  imageUrl: string;
  publishedAt: string;
  userId: string;
}

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = 'http://localhost:5018/api/posts';

  constructor(private http: HttpClient) {}

  // Get all posts
  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiUrl);
  }

  // Create a new post
  createPost(title: string, image: File): Observable<Post> {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('image', image);

    return this.http.post<Post>(this.apiUrl, formData);
  }
}
