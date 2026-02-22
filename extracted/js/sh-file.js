// SH文件管理
function handleShFileSubmit(formData) {
    const shFiles = loadData('shFiles');
    
    if (currentAction === 'add') {
        const newShFile = {
            id: Date.now().toString(),
            name: formData.get('name'),
            shUrl: formData.get('shUrl'),
            date: new Date().toISOString()
        };
        shFiles.push(newShFile);
    } else if (currentAction === 'edit' && currentItemId) {
        const index = shFiles.findIndex(item => item.id === currentItemId);
        if (index !== -1) {
            shFiles[index] = {
                ...shFiles[index],
                name: formData.get('name'),
                shUrl: formData.get('shUrl')
            };
        }
    }
    
    saveData('shFiles', shFiles);
    loadShFiles();
}

function loadShFiles() {
    const shFiles = loadData('shFiles');
    const list = document.getElementById('sh-file-list');
    list.innerHTML = '';
    
    shFiles.forEach(shFile => {
        const item = createDataItem(
            shFile.id,
            shFile.name,
            `SH链接: ${shFile.shUrl}`,
            [
                {
                    className: 'edit-btn',
                    text: '编辑',
                    callback: () => editShFile(shFile.id)
                },
                {
                    className: 'delete-btn',
                    text: '删除',
                    callback: () => deleteShFile(shFile.id)
                }
            ]
        );
        list.appendChild(item);
    });
}

function editShFile(id) {
    const shFiles = loadData('shFiles');
    const shFile = shFiles.find(item => item.id === id);
    if (shFile) {
        openModal('编辑SH文件', [
            { name: 'name', label: '文件名称', type: 'text', placeholder: 'SH文件名称', required: true },
            { name: 'shUrl', label: 'SH链接', type: 'url', placeholder: 'GitHub RAW SH链接', required: true }
        ], 'edit', id);
        
        // 填充表单数据
        document.getElementById('name').value = shFile.name;
        document.getElementById('shUrl').value = shFile.shUrl;
    }
}

function deleteShFile(id) {
    if (confirm('确定要删除这个SH文件吗？')) {
        const shFiles = loadData('shFiles');
        const filtered = shFiles.filter(item => item.id !== id);
        saveData('shFiles', filtered);
        loadShFiles();
    }
}

// 绑定添加按钮事件
document.getElementById('add-sh-file').addEventListener('click', function() {
    openModal('添加SH文件', [
        { name: 'name', label: '文件名称', type: 'text', placeholder: 'SH文件名称', required: true },
        { name: 'shUrl', label: 'SH链接', type: 'url', placeholder: 'GitHub RAW SH链接', required: true }
    ], 'add');
});