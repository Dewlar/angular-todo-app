import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragDropReceiverComponent } from './drag-drop-receiver.component';

describe('DragDropReceiverComponent', () => {
  let component: DragDropReceiverComponent;
  let fixture: ComponentFixture<DragDropReceiverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DragDropReceiverComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DragDropReceiverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
