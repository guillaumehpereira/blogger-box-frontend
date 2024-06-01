import {Component, OnInit} from '@angular/core';
import {Post} from "../data/post";
import {PostService} from "../services/post.service";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css'
})
export class PostListComponent implements OnInit {
  posts: Post[] = [];

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.loadPosts();
  }

  private loadPosts() {
    this.postService.getAll().subscribe(posts =>{
      this.posts = posts;
    })
  }
}
