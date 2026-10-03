import { Component, OnInit, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService, Complaint } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';

interface ChatMessage {
  sender: 'bot' | 'user';
  text: string;
  isHtml?: boolean;
}

@Component({
  selector: 'app-chat-bot',
  templateUrl: './chat-bot.component.html',
  styleUrls: ['./chat-bot.component.css']
})
export class ChatBotComponent implements OnInit, AfterViewChecked {
  @ViewChild('chatContainer') private chatContainer!: ElementRef;

  messages: ChatMessage[] = [];
  inputMessage = '';
  isProcessing = false;

  private menuOptions: { [key: string]: string } = {
    '1': 'Electricity',
    '2': 'Water',
    '3': 'Furniture',
    '4': 'Room Cleaning',
    '5': 'Food',
    '6': 'Ragging',
    '7': 'Others'
  };

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.toastService.info('Please log in to access the ChatBot');
      this.router.navigate(['/login']);
      return;
    }

    // Initial greeting
    this.messages.push({
      sender: 'bot',
      text: 'Hello, My name is Hostel ChatBot.<br>How can I help you today?<br>Click the button below or type "Menu" to see categories, or describe your complaint in plain words and AI will log it!',
      isHtml: true
    });
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    try {
      if (this.chatContainer) {
        this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
      }
    } catch (err) {}
  }

  handleMenuClick(): void {
    this.messages.push({
      sender: 'user',
      text: 'Menu'
    });

    setTimeout(() => {
      this.messages.push({
        sender: 'bot',
        text: '<strong>Choose a category (type 1-7):</strong><br>1. Electricity<br>2. Water<br>3. Furniture<br>4. Room Cleaning<br>5. Food<br>6. Ragging<br>7. Others<br><small>(You can also type your complaint directly, e.g., "The fan in room 204 is broken")</small>',
        isHtml: true
      });
    }, 400);
  }

  handleSend(): void {
    const text = this.inputMessage.trim();
    if (!text || this.isProcessing) return;

    this.inputMessage = '';
    this.messages.push({ sender: 'user', text });

    const lower = text.toLowerCase();

    // Check menu triggers
    if (lower === 'menu' || lower === 'main menu' || lower === 'help') {
      this.handleMenuClick();
      return;
    }

    // Check numbered option 1-7
    if (this.menuOptions[text]) {
      const type = this.menuOptions[text];
      this.messages.push({
        sender: 'bot',
        text: `Opening complaint registration for <strong>${type}</strong>...`,
        isHtml: true
      });
      setTimeout(() => {
        this.router.navigate(['/complain'], { queryParams: { type } });
      }, 1000);
      return;
    }

    // AI-Assisted Complaint Registration
    this.isProcessing = true;
    this.messages.push({
      sender: 'bot',
      text: '<em>Analyzing your message and registering complaint with AI...</em>',
      isHtml: true
    });

    this.apiService.submitComplaintAi(text).subscribe({
      next: (complaint: Complaint) => {
        this.isProcessing = false;
        // Replace typing message
        this.messages.pop();
        this.messages.push({
          sender: 'bot',
          text: `Your complaint has been successfully registered!<br>` +
                `<strong>Category:</strong> ${complaint.type}<br>` +
                `<strong>Hostel:</strong> ${complaint.hostelName || 'N/A'}<br>` +
                `<strong>Room:</strong> ${complaint.roomNo || 'N/A'}<br>` +
                `<strong>Details:</strong> ${complaint.description}<br>` +
                `<small>Status: Pending resolution by hostel admin.</small>`,
          isHtml: true
        });
        this.toastService.success('AI Complaint Registered!');
      },
      error: (err) => {
        this.isProcessing = false;
        this.messages.pop();
        console.error('AI complaint error:', err);

        // Fallback friendly guidance
        this.messages.push({
          sender: 'bot',
          text: `I received your message: "${text}".<br>` +
                `Would you like to file this manually? <br>` +
                `<button class="action-btn" onclick="window.location.href='/complain'">Open Register Complaint</button>`,
          isHtml: true
        });
      }
    });
  }

  handleKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.handleSend();
    }
  }
}
