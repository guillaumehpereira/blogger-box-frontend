import {Injectable} from '@angular/core';
import {Post, PostCreateInput} from "../data/post";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../environment/environment";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private postsUrl = `${environment.apiUrl}/v1/posts`;

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Post[]> {
    return this.http.get<Post[]>(this.postsUrl);
  }

  create(category: PostCreateInput): Observable<Post> {
    return this.http.post<Post>(this.postsUrl, category);
  }
}
