document.addEventListener('DOMContentLoaded', function () {
    loadSearchedTopics();
    loadMessages();
    loadQuestions();
    loadThreads();
});

function loadThreads() {
     // Fetch and display threads from storage or a server
    const threads = JSON.parse(localStorage.getItem('threads')) || [];
    const threadListElement = document.getElementById('question-list');
    
    threadListElement.innerHTML = '';
    threads.forEach(function (thread) {
        const threadDiv = document.createElement('div');
        threadDiv.classList.add('thread');
        threadDiv.innerHTML = `
            <p>${thread.text}</p>
            <button onclick="upvoteThread('${thread.id}')">Upvote (${thread.upvotes})</button>
            <button onclick="replyToThread('${thread.id}')">Reply</button>
            <div id="answers-${thread.id}" class="answers"></div>
            <textarea id="answer-input-${thread.id}" class="answer-input" placeholder="Type your answer..."></textarea>
            <button onclick="postAnswer('${thread.id}')">Post Answer</button>
        `;
        threadListElement.appendChild(threadDiv);

        // Load and display answers for each thread
        const answersElement = document.getElementById(`answers-${thread.id}`);
        thread.answers.forEach(function (answer) {
            const answerDiv = document.createElement('div');
            answerDiv.classList.add('answer');
            answerDiv.textContent = `${answer.author}: ${answer.text}`;
            answersElement.appendChild(answerDiv);
        });
    });
}

function postThread() {
    // Post a thread/question and update the thread list
    const threadInput = document.getElementById('thread-input');
    const threadText = threadInput.value.trim();
    
    if (threadText !== '') {
        const threads = JSON.parse(localStorage.getItem('threads')) || [];
        const userProfile = JSON.parse(localStorage.getItem('userProfile')) || {};

        const newThread = {
            id: Date.now().toString(),
            text: threadText,
            upvotes: 0,
            answers: [],
        };

        threads.push(newThread);
        localStorage.setItem('threads', JSON.stringify(threads));
        loadThreads();

        threadInput.value = '';
    }
}

function upvoteThread(threadId) {
    // Upvote a thread/question and update the thread list
    const threads = JSON.parse(localStorage.getItem('threads')) || [];
    const threadIndex = threads.findIndex(thread => thread.id === threadId);

    if (threadIndex !== -1) {
        threads[threadIndex].upvotes += 1;
        localStorage.setItem('threads', JSON.stringify(threads));
        loadThreads();
    }
}

function replyToThread(threadId) {
    // Toggle visibility of answer input for a specific thread
    const answerInput = document.getElementById(`answer-input-${threadId}`);
    answerInput.style.display = answerInput.style.display === 'none' ? 'block' : 'none';
}

function postAnswer(threadId) {
    // Post an answer to a thread/question and update the thread list
    const answerInput = document.getElementById(`answer-input-${threadId}`);
    const answerText = answerInput.value.trim();
    
    if (answerText !== '') {
        const threads = JSON.parse(localStorage.getItem('threads')) || [];
        const threadIndex = threads.findIndex(thread => thread.id === threadId);

        if (threadIndex !== -1) {
            const userProfile = JSON.parse(localStorage.getItem('userProfile')) || {};
            const newAnswer = {
                author: userProfile.username || 'Guest',
                text: answerText,
            };

            threads[threadIndex].answers.push(newAnswer);
            localStorage.setItem('threads', JSON.stringify(threads));
            loadThreads();

            answerInput.value = '';
            answerInput.style.display = 'none';
        }
    }
}

function refreshThreads() {
    // Fetch and display the latest threads
    loadThreads();
}

function loadSearchedTopics() {
    // Fetch and display most searched topics from storage or a server
    const searchedTopics = JSON.parse(localStorage.getItem('searchedTopics')) || [];
    const searchedTopicsListElement = document.getElementById('searched-topics-list');

    searchedTopicsListElement.innerHTML = '';
    searchedTopics.forEach(function (topic) {
        const topicItem = document.createElement('li');
        topicItem.textContent = topic;
        searchedTopicsListElement.appendChild(topicItem);
    });
}

function loadMessages() {
    // Fetch and display messages between two users
    const messages = JSON.parse(localStorage.getItem('messages')) || [];
    const chatBoxElement = document.getElementById('chat-box');

    chatBoxElement.innerHTML = '';
    messages.forEach(function (message) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        messageDiv.textContent = `${message.sender}: ${message.text}`;
        chatBoxElement.appendChild(messageDiv);
    });
}

function sendMessage() {
    // Send a message and update the messages section
    const messageInput = document.getElementById('message-input');
    const messageText = messageInput.value.trim();
    
    if (messageText !== '') {
        const messages = JSON.parse(localStorage.getItem('messages')) || [];
        
        const newMessage = {
            sender: 'User',  // Assuming the sender is the current user
            text: messageText,
        };

        messages.push(newMessage);
        localStorage.setItem('messages', JSON.stringify(messages));
        loadMessages();
        
        messageInput.value = '';
    }
}

function loadQuestions() {
    // Fetch and display questions from storage or a server
    const questions = JSON.parse(localStorage.getItem('questions')) || [];
    const questionListElement = document.getElementById('question-list');
    
    questionListElement.innerHTML = '';
    questions.forEach(function (question) {
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question');
        questionDiv.innerHTML = `
            <p>${question.text}</p>
            <button onclick="upvoteQuestion('${question.id}')">Upvote (${question.upvotes})</button>
            <button onclick="reactToQuestion('${question.id}')">React (${question.reactions})</button>
            <button onclick="shareQuestion('${question.id}')">Share</button>
            <button onclick="replyToQuestion('${question.id}')">Reply</button>
            <div id="replies-${question.id}" class="replies"></div>
            <textarea id="reply-input-${question.id}" class="reply-input" placeholder="Type your reply..."></textarea>
            <button onclick="postReply('${question.id}')">Post Reply</button>
        `;
        questionListElement.appendChild(questionDiv);

        // Load and display replies for each question
        const repliesElement = document.getElementById(`replies-${question.id}`);
        question.replies.forEach(function (reply) {
            const replyDiv = document.createElement('div');
            replyDiv.classList.add('reply');
            replyDiv.textContent = `${reply.author}: ${reply.text}`;
            repliesElement.appendChild(replyDiv);
        });
    });
}

function upvoteQuestion(questionId) {
    // Upvote a question and update the question list
    const questions = JSON.parse(localStorage.getItem('questions')) || [];
    const questionIndex = questions.findIndex(question => question.id === questionId);

    if (questionIndex !== -1) {
        questions[questionIndex].upvotes += 1;
        localStorage.setItem('questions', JSON.stringify(questions));
        loadQuestions();
    }
}

function reactToQuestion(questionId) {
    // React to a question and update the question list
    const questions = JSON.parse(localStorage.getItem('questions')) || [];
    const questionIndex = questions.findIndex(question => question.id === questionId);

    if (questionIndex !== -1) {
        questions[questionIndex].reactions += 1;
        localStorage.setItem('questions', JSON.stringify(questions));
        loadQuestions();
    }
}

function shareQuestion(questionId) {
    // Share functionality (for example, you can implement sharing via social media)
    alert(`Question ${questionId} shared!`);
}

function replyToQuestion(questionId) {
    // Toggle visibility of reply input for a specific question
    const replyInput = document.getElementById(`reply-input-${questionId}`);
    replyInput.style.display = replyInput.style.display === 'none' ? 'block' : 'none';
}

function postReply(questionId) {
    // Post a reply to a question and update the question list
    const replyInput = document.getElementById(`reply-input-${questionId}`);
    const replyText = replyInput.value.trim();
    
    if (replyText !== '') {
        const questions = JSON.parse(localStorage.getItem('questions')) || [];
        const questionIndex = questions.findIndex(question => question.id === questionId);

        if (questionIndex !== -1) {
            const userProfile = JSON.parse(localStorage.getItem('userProfile')) || {};
            const newReply = {
                author: userProfile.username || 'Guest',
                text: replyText,
            };

            questions[questionIndex].replies.push(newReply);
            localStorage.setItem('questions', JSON.stringify(questions));
            loadQuestions();

            replyInput.value = '';
            replyInput.style.display = 'none';
        }
    }
}

function refreshQuestions() {
    // Fetch and display the latest questions
    loadQuestions();
}

