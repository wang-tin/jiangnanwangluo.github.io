// 公告管理
async function handleAnnouncementSubmit(formData) {
    const announcements = await loadData('announcements');
    
    if (currentAction === 'add') {
        const newAnnouncement = {
            id: Date.now().toString(),
            title: formData.get('title'),
            content: formData.get('content'),
            date: new Date().toISOString()
        };
        announcements.push(newAnnouncement);
    } else if (currentAction === 'edit' && currentItemId) {
        const index = announcements.findIndex(item => item.id === currentItemId);
        if (index !== -1) {
            announcements[index] = {
                ...announcements[index],
                title: formData.get('title'),
                content: formData.get('content')
            };
        }
    }
    
    await saveData('announcements', announcements);
    await loadAnnouncements();
}

async function loadAnnouncements() {
    const announcements = await loadData('announcements');
    const list = document.getElementById('announcement-list');
    list.innerHTML = '';
    
    announcements.forEach(announcement => {
        const item = createDataItem(
            announcement.id,
            announcement.title,
            `${announcement.content.substring(0, 100)}...`,
            [
                {
                    className: 'edit-btn',
                    text: '编辑',
                    callback: () => editAnnouncement(announcement.id)
                },
                {
                    className: 'delete-btn',
                    text: '删除',
                    callback: () => deleteAnnouncement(announcement.id)
                }
            ]
        );
        list.appendChild(item);
    });
}

async function editAnnouncement(id) {
    const announcements = await loadData('announcements');
    const announcement = announcements.find(item => item.id === id);
    if (announcement) {
        openModal('编辑公告', [
            { name: 'title', label: '标题', type: 'text', placeholder: '公告标题', required: true },
            { name: 'content', label: '内容', type: 'textarea', placeholder: '公告内容', required: true }
        ], 'edit', id);
        
        // 填充表单数据
        document.getElementById('title').value = announcement.title;
        document.getElementById('content').value = announcement.content;
    }
}

async function deleteAnnouncement(id) {
    if (confirm('确定要删除这个公告吗？')) {
        const announcements = await loadData('announcements');
        const filtered = announcements.filter(item => item.id !== id);
        await saveData('announcements', filtered);
        await loadAnnouncements();
    }
}

// 绑定添加按钮事件
document.getElementById('add-announcement').addEventListener('click', function() {
    openModal('添加公告', [
        { name: 'title', label: '标题', type: 'text', placeholder: '公告标题', required: true },
        { name: 'content', label: '内容', type: 'textarea', placeholder: '公告内容', required: true }
    ], 'add');
});