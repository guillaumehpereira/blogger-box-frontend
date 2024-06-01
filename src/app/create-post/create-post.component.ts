import {Component, OnInit} from '@angular/core';
import {PostService} from "../services/post.service";
import {FormBuilder, Validators} from "@angular/forms";
import {Category} from "../data/category";
import {CategoryService} from "../services/category.service";
import {PostCreateInput} from "../data/post";
import {Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css'
})
export class CreatePostComponent implements OnInit {

  categories: Category[] = [];

  constructor(private postService: PostService,
              private categoryService: CategoryService,
              private formBuilder: FormBuilder,
              private router: Router) { }

  createPostForm = this.formBuilder.group({
    title: ['', {validators:[Validators.required,Validators.minLength(5), Validators.maxLength(250)],updateOn:'blur'}],
    categoryId:['', {validators:[Validators.required],updateOn:'blur'}],
    content: ['', {validators:[Validators.required, Validators.maxLength(2500)],updateOn:'blur'}],
  })

  ngOnInit(): void {
    this.loadCategories();
  }

  private loadCategories() {
    this.categoryService.getAll().subscribe(categories =>{
      this.categories = categories;
    })
  }

  protected submitCreatePost(): void {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    if (this.createPostForm.valid) {
      const post: PostCreateInput = {
        title: this.createPostForm.value.title!,
        categoryId: this.createPostForm.value.categoryId!,
        content: this.createPostForm.value.content!
      }
      this.postService.create(post).subscribe(()=>this.router.navigate(['/']))
      Toast.fire({
        icon: "success",
        title: "Post submitted successfully"
      });
    }
    else{
      Toast.fire({
        icon: "error",
        title: "Please review your Post"
      });
    }
  }

  get title(){
    return this.createPostForm.controls['title'];
  }

  get categoryId(){
    return this.createPostForm.controls['categoryId'];
  }

  get content(){
    return this.createPostForm.controls['content'];
  }


}
