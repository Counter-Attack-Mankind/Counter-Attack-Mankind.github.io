// 定义菜品数据
const dishes = {
    new_canteen: {
        first_floor: ['A', 'B', 'C'],
        second_floor: ['D', 'E', 'F']
    },
    old_canteen: {
        first_floor: ['G', 'H', 'I'],
        second_floor: ['J', 'K', 'L'],
        third_floor: ['M', 'N', 'O']
    }
};

// 定义偏好对应的菜品集合
const preferences = {
    rice: ['A', 'D', 'H', 'L', 'M'], // 米饭相关菜品
    noodles: ['B', 'D', 'E', 'N']   // 面食相关菜品
};

// 获取 DOM 元素
const locationSelect = document.getElementById('location');
const floorSelect = document.getElementById('floor');
const preferenceSelect = document.getElementById('preference'); // 获取偏好选择
const submitButton = document.getElementById('submitButton');
const randomButton = document.getElementById('randomButton');
const resultElement = document.getElementById('result');
const imageContainer = document.getElementById('imageContainer'); // 获取图片容器
const dishImage = document.getElementById('dishImage'); // 获取图片元素

// 添加按钮点击事件监听器
submitButton.addEventListener('click', selectRandomDish);
randomButton.addEventListener('click', selectAllRandom);

// 随机选择菜品函数（用户手动选择地点和楼层）
function selectRandomDish() {
    // 获取用户选择的地点、楼层和偏好
    const location = locationSelect.value;
    const floor = floorSelect.value;
    const preference = preferenceSelect.value;

    // 根据偏好筛选菜品
    let availableDishes = [];
    if (dishes[location] && dishes[location][floor]) {
        availableDishes = dishes[location][floor];
    }

    if (preference !== "none") {
        availableDishes = availableDishes.filter(dish => preferences[preference].includes(dish));
    }

    // 如果有可用菜品，则随机选择
    if (availableDishes.length > 0) {
        const randomIndex = Math.floor(Math.random() * availableDishes.length);
        const selectedDish = availableDishes[randomIndex];

        // 显示结果
        resultElement.textContent = `您选择了：${selectedDish}`;

        // 更新图片并显示图片容器
        updateDishImage(selectedDish);
        showImageContainer();
    } else {
        // 如果没有对应的数据，提示错误并隐藏图片容器
        resultElement.textContent = "抱歉，该地点和楼层没有符合偏好的菜品数据。";
        hideImageContainer();
    }
}

// 楼层中文映射对象
const floorChineseMap = {
    first_floor: "一楼",
    second_floor: "二楼",
    third_floor: "三楼"
};

const locationChineseMap = {
    new_canteen: "西苑新食堂",
    old_canteen: "西苑老食堂"
};

// 全部随机选择函数
function selectAllRandom() {
    // 获取用户当前选择的偏好
    const userPreference = preferenceSelect.value;

    // 如果用户选择了偏好，则从对应的菜品集合中随机选择菜品
    if (userPreference !== "none") {
        const preferredDishes = preferences[userPreference]; // 获取偏好对应的菜品集合

        // 随机选择一个菜品
        const randomDishIndex = Math.floor(Math.random() * preferredDishes.length);
        const selectedDish = preferredDishes[randomDishIndex];

        // 反向查找菜品所在的地点和楼层
        let locationFound = null;
        let floorFound = null;

        for (const [location, floors] of Object.entries(dishes)) {
            for (const [floor, dishesList] of Object.entries(floors)) {
                if (dishesList.includes(selectedDish)) {
                    locationFound = location;
                    floorFound = floor;
                    break;
                }
            }
            if (locationFound && floorFound) break;
        }

        // 如果找到了对应的地点和楼层
        if (locationFound && floorFound) {
            // 将楼层和位置转换为中文
            const chineseFloor = floorChineseMap[floorFound];
            const chineseLocation = locationChineseMap[locationFound];

            // 显示结果
            resultElement.textContent = `随机选择了：地点 - ${chineseLocation}，楼层 - ${chineseFloor}，菜品 - ${selectedDish}`;

            // 更新下拉菜单的选择
            locationSelect.value = locationFound;
            floorSelect.value = floorFound;

            // 不更新偏好选项，保持用户选择的偏好不变

            // 更新图片并显示图片容器
            updateDishImage(selectedDish);
            showImageContainer();
        } else {
            // 如果没有对应的数据，提示错误并隐藏图片容器
            resultElement.textContent = "抱歉，随机选择失败，可能缺少符合偏好的菜品数据。";
            hideImageContainer();
        }
    } else {
        // 如果用户选择的是 "none"（无偏好），则随机选择地点、楼层和菜品
        const locations = Object.keys(dishes); // 获取所有地点键名
        const randomLocation = locations[Math.floor(Math.random() * locations.length)];
        const floors = Object.keys(dishes[randomLocation]); // 获取随机地点的所有楼层键名
        const randomFloor = floors[Math.floor(Math.random() * floors.length)];

        // 获取随机选择的地点和楼层的菜品
        const availableDishes = dishes[randomLocation][randomFloor];

        // 随机选择一个菜品
        const randomDishIndex = Math.floor(Math.random() * availableDishes.length);
        const selectedDish = availableDishes[randomDishIndex];

        // 将楼层和位置转换为中文
        const chineseFloor = floorChineseMap[randomFloor];
        const chineseLocation = locationChineseMap[randomLocation];

        // 显示结果
        resultElement.textContent = `随机选择了：地点 - ${chineseLocation}，楼层 - ${chineseFloor}，菜品 - ${selectedDish}`;

        // 更新下拉菜单的选择
        locationSelect.value = randomLocation;
        floorSelect.value = randomFloor;

        // 更新图片并显示图片容器
        updateDishImage(selectedDish);
        showImageContainer();
    }
}

// 更新菜品图片函数
function updateDishImage(dish) {
    // 构造图片路径
    const imagePath = `/images/${dish}.jpg`;

    // 设置图片 src 属性
    dishImage.src = imagePath;
}

// 显示图片容器函数
function showImageContainer() {
    imageContainer.style.display = "block"; // 显示图片容器
}

// 隐藏图片容器函数
function hideImageContainer() {
    imageContainer.style.display = "none"; // 隐藏图片容器
}