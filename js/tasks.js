document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const projectId = params.get('id');
  const taskList = document.getElementById('taskList');
  const projectName = document.getElementById('projectName');

  const titleInput = document.getElementById('taskTitle');
  const deadlineInput = document.getElementById('taskDeadline');
  const addBtn = document.getElementById('addTaskBtn');

  async function loadProjectName() {
    const doc = await db.collection('projects').doc(projectId).get();
    if (doc.exists) {
      projectName.textContent = doc.data().name;
    }
  }

  async function addTask() {
    const title = titleInput.value.trim();
    const deadline = deadlineInput.value;
    if (!title || !deadline) return alert("Enter all fields");

    await db.collection('projects').doc(projectId).collection('tasks').add({
      title,
      deadline,
      comments: []
    });

    titleInput.value = '';
    deadlineInput.value = '';
    loadTasks();
  }

  async function loadTasks() {
    const snapshot = await db.collection('projects').doc(projectId).collection('tasks').get();
    taskList.innerHTML = '';
    snapshot.forEach(doc => {
      const data = doc.data();
      const div = document.createElement('div');
      div.className = "bg-white p-4 rounded shadow";
      div.innerHTML = `
        <h3 class="font-semibold text-lg">${data.title}</h3>
        <p class="text-sm text-gray-600">Deadline: ${data.deadline}</p>
        <div class="mt-2">
          <input type="text" class="border px-2 py-1 w-full comment-input" data-id="${doc.id}" placeholder="Add comment" />
        </div>
        <ul class="mt-2 text-sm text-gray-700" id="comments-${doc.id}">
          ${(data.comments || []).map(c => `<li>• ${c}</li>`).join('')}
        </ul>
      `;
      taskList.appendChild(div);
    });

    document.querySelectorAll('.comment-input').forEach(input => {
      input.addEventListener('keydown', async (e) => {
        if (e.key === 'Enter') {
          const id = input.dataset.id;
          const value = input.value.trim();
          if (!value) return;
          const ref = db.collection('projects').doc(projectId).collection('tasks').doc(id);
          const doc = await ref.get();
          const oldComments = doc.data().comments || [];
          oldComments.push(value);
          await ref.update({ comments: oldComments });
          input.value = '';
          loadTasks();
        }
      });
    });
  }

  addBtn.addEventListener('click', addTask);
  loadProjectName();
  loadTasks();
});
