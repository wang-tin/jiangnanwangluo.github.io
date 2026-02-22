// 全局变量
let currentSection = 'announcement';
let currentAction = 'add';
let currentItemId = null;

// 初始化页面
async function initPage() {
    setupNavigation();
    setupModal();
    await loadInitialData();
}

// 设置导航
function setupNavigation() {
    const navBtns = document.querySelectorAll('.nav-btn');
    navBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const section = this.dataset.section;
            switchSection(section);
            
            // 更新按钮状态
            navBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// 切换 section
function switchSection(section) {
    document.querySelectorAll('.section').forEach(s => {
        s.classList.remove('active');
    });
    document.getElementById(section).classList.add('active');
    currentSection = section;
}

// 设置模态框
function setupModal() {
    const modal = document.getElementById('modal');
    const closeBtn = document.querySelector('.close');
    const cancelBtn = document.createElement('button');
    cancelBtn.className = 'cancel-btn';
    cancelBtn.textContent = '取消';
    cancelBtn.addEventListener('click', closeModal);
    
    const submitBtn = document.createElement('button');
    submitBtn.className = 'submit-btn';
    submitBtn.textContent = '提交';
    submitBtn.addEventListener('click', submitForm);
    
    const formActions = document.createElement('div');
    formActions.className = 'form-actions';
    formActions.appendChild(cancelBtn);
    formActions.appendChild(submitBtn);
    
    document.getElementById('modal-form').appendChild(formActions);
    
    closeBtn.addEventListener('click', closeModal);
    
    window.addEventListener('click', function(event) {
        if (event.target == modal) {
            closeModal();
        }
    });
}

// 打开模态框
function openModal(title, fields, action, itemId = null) {
    document.getElementById('modal-title').textContent = title;
    const form = document.getElementById('modal-form');
    
    // 清空表单
    const formGroups = form.querySelectorAll('.form-group');
    formGroups.forEach(group => group.remove());
    
    // 添加字段
    fields.forEach(field => {
        const formGroup = document.createElement('div');
        formGroup.className = 'form-group';
        
        const label = document.createElement('label');
        label.textContent = field.label;
        label.htmlFor = field.name;
        
        let input;
        if (field.type === 'textarea') {
            input = document.createElement('textarea');
        } else {
            input = document.createElement('input');
            input.type = field.type;
        }
        
        input.id = field.name;
        input.name = field.name;
        if (field.placeholder) {
            input.placeholder = field.placeholder;
        }
        if (field.required) {
            input.required = true;
        }
        if (field.accept) {
            input.accept = field.accept;
        }
        
        formGroup.appendChild(label);
        formGroup.appendChild(input);
        form.insertBefore(formGroup, form.lastChild);
    });
    
    currentAction = action;
    currentItemId = itemId;
    document.getElementById('modal').classList.add('show');
}

// 关闭模态框
function closeModal() {
    document.getElementById('modal').classList.remove('show');
    currentAction = 'add';
    currentItemId = null;
}

// 提交表单
async function submitForm() {
    const form = document.getElementById('modal-form');
    const formData = new FormData(form);
    
    // 根据当前 section 处理提交
    try {
        switch (currentSection) {
            case 'announcement':
                await handleAnnouncementSubmit(formData);
                break;
            case 'detection':
                await handleDetectionSubmit(formData);
                break;
            case 'spring-autumn':
                await handleSpringAutumnSubmit(formData);
                break;
            case 'momo':
                await handleMomoSubmit(formData);
                break;
            case 'niutou':
                await handleNiutouSubmit(formData);
                break;
            case 'luan':
                await handleLuanSubmit(formData);
                break;
            case 'module':
                await handleModuleSubmit(formData);
                break;
            case 'sh-file':
                await handleShFileSubmit(formData);
                break;
        }
    } catch (error) {
        console.error('提交表单失败:', error);
        alert('提交失败，请重试');
    }
    
    closeModal();
}

// 加载初始数据
async function loadInitialData() {
    try {
        await loadAnnouncements();
        await loadDetections();
        await loadSpringAutumnItems();
        await loadMomoItems();
        await loadNiutouItems();
        await loadLuanItems();
        await loadModules();
        await loadShFiles();
    } catch (error) {
        console.error('加载初始数据失败:', error);
    }
}

// 保存数据到GitHub仓库
async function saveData(key, data) {
    try {
        const response = await fetch(`data/${key}.json`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data, null, 2)
        });
        return response.ok;
    } catch (error) {
        console.error('保存数据失败:', error);
        // 降级到本地存储
        localStorage.setItem(key, JSON.stringify(data));
        return false;
    }
}

// 从GitHub仓库加载数据
async function loadData(key) {
    try {
        const response = await fetch(`data/${key}.json`);
        if (response.ok) {
            return await response.json();
        }
    } catch (error) {
        console.error('加载数据失败:', error);
    }
    // 降级到本地存储
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
}

// 创建数据项元素
function createDataItem(id, title, content, actions) {
    const item = document.createElement('div');
    item.className = 'data-item';
    item.dataset.id = id;
    
    const h3 = document.createElement('h3');
    h3.textContent = title;
    
    const p = document.createElement('p');
    p.textContent = content;
    
    const actionDiv = document.createElement('div');
    actionDiv.className = 'actions';
    
    actions.forEach(action => {
        const btn = document.createElement('button');
        btn.className = action.className;
        btn.textContent = action.text;
        btn.addEventListener('click', action.callback);
        actionDiv.appendChild(btn);
    });
    
    item.appendChild(h3);
    item.appendChild(p);
    item.appendChild(actionDiv);
    
    return item;
}

// 初始化页面
window.addEventListener('DOMContentLoaded', async function() {
    await initPage();
});