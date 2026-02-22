// Luan管理
function handleLuanSubmit(formData) {
    const items = loadData('luanItems');
    
    if (currentAction === 'add') {
        const newItem = {
            id: Date.now().toString(),
            keyword: formData.get('keyword'),
            solution: formData.get('solution'),
            date: new Date().toISOString()
        };
        items.push(newItem);
    } else if (currentAction === 'edit' && currentItemId) {
        const index = items.findIndex(item => item.id === currentItemId);
        if (index !== -1) {
            items[index] = {
                ...items[index],
                keyword: formData.get('keyword'),
                solution: formData.get('solution')
            };
        }
    }
    
    saveData('luanItems', items);
    loadLuanItems();
}

function loadLuanItems() {
    const items = loadData('luanItems');
    const list = document.getElementById('luan-list');
    list.innerHTML = '';
    
    items.forEach(item => {
        const itemElement = createDataItem(
            item.id,
            item.keyword,
            `${item.solution.substring(0, 100)}...`,
            [
                {
                    className: 'edit-btn',
                    text: '编辑',
                    callback: () => editLuanItem(item.id)
                },
                {
                    className: 'delete-btn',
                    text: '删除',
                    callback: () => deleteLuanItem(item.id)
                }
            ]
        );
        list.appendChild(itemElement);
    });
}

function editLuanItem(id) {
    const items = loadData('luanItems');
    const item = items.find(item => item.id === id);
    if (item) {
        openModal('编辑Luan词条', [
            { name: 'keyword', label: '词条', type: 'text', placeholder: 'Luan词条', required: true },
            { name: 'solution', label: '解决方案', type: 'textarea', placeholder: '解决方案', required: true }
        ], 'edit', id);
        
        // 填充表单数据
        document.getElementById('keyword').value = item.keyword;
        document.getElementById('solution').value = item.solution;
    }
}

function deleteLuanItem(id) {
    if (confirm('确定要删除这个词条吗？')) {
        const items = loadData('luanItems');
        const filtered = items.filter(item => item.id !== id);
        saveData('luanItems', filtered);
        loadLuanItems();
    }
}

// 绑定添加按钮事件
document.getElementById('add-luan').addEventListener('click', function() {
    openModal('添加Luan词条', [
        { name: 'keyword', label: '词条', type: 'text', placeholder: 'Luan词条', required: true },
        { name: 'solution', label: '解决方案', type: 'textarea', placeholder: '解决方案', required: true }
    ], 'add');
});