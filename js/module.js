// 模块下载管理
function handleModuleSubmit(formData) {
    const modules = loadData('modules');
    
    if (currentAction === 'add') {
        const newModule = {
            id: Date.now().toString(),
            name: formData.get('name'),
            zipUrl: formData.get('zipUrl'),
            date: new Date().toISOString()
        };
        modules.push(newModule);
    } else if (currentAction === 'edit' && currentItemId) {
        const index = modules.findIndex(item => item.id === currentItemId);
        if (index !== -1) {
            modules[index] = {
                ...modules[index],
                name: formData.get('name'),
                zipUrl: formData.get('zipUrl')
            };
        }
    }
    
    saveData('modules', modules);
    loadModules();
}

function loadModules() {
    const modules = loadData('modules');
    const list = document.getElementById('module-list');
    list.innerHTML = '';
    
    modules.forEach(module => {
        const item = createDataItem(
            module.id,
            module.name,
            `ZIP链接: ${module.zipUrl}`,
            [
                {
                    className: 'edit-btn',
                    text: '编辑',
                    callback: () => editModule(module.id)
                },
                {
                    className: 'delete-btn',
                    text: '删除',
                    callback: () => deleteModule(module.id)
                }
            ]
        );
        list.appendChild(item);
    });
}

function editModule(id) {
    const modules = loadData('modules');
    const module = modules.find(item => item.id === id);
    if (module) {
        openModal('编辑模块', [
            { name: 'name', label: '模块名称', type: 'text', placeholder: '模块名称', required: true },
            { name: 'zipUrl', label: 'ZIP链接', type: 'url', placeholder: 'GitHub RAW ZIP链接', required: true }
        ], 'edit', id);
        
        // 填充表单数据
        document.getElementById('name').value = module.name;
        document.getElementById('zipUrl').value = module.zipUrl;
    }
}

function deleteModule(id) {
    if (confirm('确定要删除这个模块吗？')) {
        const modules = loadData('modules');
        const filtered = modules.filter(item => item.id !== id);
        saveData('modules', filtered);
        loadModules();
    }
}

// 绑定添加按钮事件
document.getElementById('add-module').addEventListener('click', function() {
    openModal('添加模块', [
        { name: 'name', label: '模块名称', type: 'text', placeholder: '模块名称', required: true },
        { name: 'zipUrl', label: 'ZIP链接', type: 'url', placeholder: 'GitHub RAW ZIP链接', required: true }
    ], 'add');
});