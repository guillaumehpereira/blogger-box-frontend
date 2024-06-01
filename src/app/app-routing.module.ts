import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PostListComponent} from "./post-list/post-list.component";
import {CreatePostComponent} from "./create-post/create-post.component";

const routes: Routes = [
  { path: '', component: PostListComponent },
  { path: 'writeNewPost', component: CreatePostComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
