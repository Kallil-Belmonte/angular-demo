import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsPerPageComponent } from './posts-per-page.component';

describe('PostsPerPageComponent', () => {
  let component: PostsPerPageComponent;
  let fixture: ComponentFixture<PostsPerPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostsPerPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsPerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
