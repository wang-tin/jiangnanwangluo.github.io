// 检测软件管理
function handleDetectionSubmit(formData) {
    const detections = loadData('detections');
    
    if (currentAction === 'add') {
        const newDetection = {
            id: Date.now().toString(),
            name: formData.get('name'),
            apkUrl: formData.get('apkUrl'),
            date: new Date().toISOString()
        };
        detections.push(newDetection);
    } else if (currentAction === 'edit' && currentItemId) {
        const index = detections.findIndex(item => item.id === currentItemId);
        if (index !== -1) {
            detections[index] = {
                ...detections[index],
                name: formData.get('name'),
                apkUrl: formData.get('apkUrl')
            };
        }
    }
    
    saveData('detections', detections);
    loadDetections();
}

function loadDetections() {
    const detections = loadData('detections');
    const list = document.getElementById('detection-list');
    list.innerHTML = '';
    
    detections.forEach(detection => {
        const item = createDataItem(
            detection.id,
            detection.name,
            `APK链接: ${detection.apkUrl}`,
            [
                {
                    className: 'edit-btn',
                    text: '编辑',
                    callback: () => editDetection(detection.id)
                },
                {
                    className: 'delete-btn',
                    text: '删除',
                    callback: () => deleteDetection(detection.id)
                }
            ]
        );
        list.appendChild(item);
    });
}

function editDetection(id) {
    const detections = loadData('detections');
    const detection = detections.find(item => item.id === id);
    if (detection) {
        openModal('编辑检测软件', [
            { name: 'name', label: '软件名称', type: 'text', placeholder: '检测软件名称', required: true },
            { name: 'apkUrl', label: 'APK链接', type: 'url', placeholder: 'GitHub RAW APK链接', required: true }
        ], 'edit', id);
        
        // 填充表单数据
        document.getElementById('name').value = detection.name;
        document.getElementById('apkUrl').value = detection.apkUrl;
    }
}

function deleteDetection(id) {
    if (confirm('确定要删除这个检测软件吗？')) {
        const detections = loadData('detections');
        const filtered = detections.filter(item => item.id !== id);
        saveData('detections', filtered);
        loadDetections();
    }
}

// 绑定添加按钮事件
document.getElementById('add-detection').addEventListener('click', function() {
    openModal('添加检测软件', [
        { name: 'name', label: '软件名称', type: 'text', placeholder: '检测软件名称', required: true },
        { name: 'apkUrl', label: 'APK链接', type: 'url', placeholder: 'GitHub RAW APK链接', required: true }
    ], 'add');
});