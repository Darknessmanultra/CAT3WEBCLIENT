import { Component, OnInit } from '@angular/core';
import { Post, PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit{
  posts: Post[] = [];

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.postService.getPosts().subscribe({
      next: (posts) => (this.posts = posts),
      error: (err) => console.error('Error fetching posts:', err)
    });
  }
}
