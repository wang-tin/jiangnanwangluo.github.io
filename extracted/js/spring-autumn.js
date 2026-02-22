// 春秋检测管理
function handleSpringAutumnSubmit(formData) {
    const items = loadData('springAutumnItems');
    
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
    
    saveData('springAutumnItems', items);
    loadSpringAutumnItems();
}

function loadSpringAutumnItems() {
    const items = loadData('springAutumnItems');
    const list = document.getElementById('spring-autumn-list');
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
                    callback: () => editSpringAutumnItem(item.id)
                },
                {
                    className: 'delete-btn',
                    text: '删除',
                    callback: () => deleteSpringAutumnItem(item.id)
                }
            ]
        );
        list.appendChild(itemElement);
    });
}

function editSpringAutumnItem(id) {
    const items = loadData('springAutumnItems');
    const item = items.find(item => item.id === id);
    if (item) {
        openModal('编辑春秋检测词条', [
            { name: 'keyword', label: '词条', type: 'text', placeholder: '检测词条', required: true },
            { name: 'solution', label: '解决方案', type: 'textarea', placeholder: '解决方案', required: true }
        ], 'edit', id);
        
        // 填充表单数据
        document.getElementById('keyword').value = item.keyword;
        document.getElementById('solution').value = item.solution;
    }
}

function deleteSpringAutumnItem(id) {
    if (confirm('确定要删除这个词条吗？')) {
        const items = loadData('springAutumnItems');
        const filtered = items.filter(item => item.id !== id);
        saveData('springAutumnItems', filtered);
        loadSpringAutumnItems();
    }
}

// 绑定添加按钮事件
document.getElementById('add-spring-autumn').addEventListener('click', function() {
    openModal('添加春秋检测词条', [
        { name: 'keyword', label: '词条', type: 'text', placeholder: '检测词条', required: true },
        { name: 'solution', label: '解决方案', type: 'textarea', placeholder: '解决方案', required: true }
    ], 'add');
});