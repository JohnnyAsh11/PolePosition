import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OpenF1Client } from '../api/openf1.client';

@Component({
  imports: [RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  private readonly client = inject(OpenF1Client);
  protected readonly title = signal('PolePosition');

  constructor() {
    var resp = this.client.sessions(2026);

    resp.forEach((session) => {
      console.log(session);
    });
  }
}
