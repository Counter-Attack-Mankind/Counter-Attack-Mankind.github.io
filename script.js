// 定义菜品数据
const dishes = {
    new_canteen: {
        first_floor: ['0090汉堡工厂', '沏芝堡', '煎饼烤冷面','营养粥','馄饨汤包炒面','精品快餐1','三汁焖锅','镇江锅盖面','鲜食烩套餐','干锅演义',
            '烤盘饭','麻辣拌','手工水饺','青海拉面','黄焖鸡&米线'],
        second_floor: ['玉娘娘水饺', '重庆特色面', '牛肉汤鸡汤','土豆泥拌饭','剁椒猪脚饭','精品快餐2','黄焖鸡米饭1','无刺酸菜鱼','铁板炒饭炸串','大碗面',
            '川渝盖浇饭','日韩料理','茶香鸡','香锅麻辣烫']
    },
    old_canteen: {
        first_floor: ['囧一碗水煮肉片', '马姥姥水饺', '扬州炒饭','芜湖小炒','王朝虎麻辣烫','犟小强麻辣烫','黄焖鸡米饭2','兰州拉面民族风味','脆皮烤鸭饭','重庆小面','香酥鸡特色饭',
            '精品快餐3','面夫子','喜多多自选盖饭','特色饼','瓦香鸡米饭1','杂粮煎饼','七里香馄饨煎饼','岳阳楼粉面馆','超级汉堡'],
        second_floor: ['喜翻拌', '螺当铺螺蛳粉', '烤肉卤拌饭','食太郎现炒浇头面','手工馄饨水饺','瓦香鸡米饭2','营养快餐','酥大娘烧饼','朱家小馆羊杂面','老母鸡牛肉汤面',
            '西里巷铁板厨房','搞一碗炒饭','回味香小炒','徐州老味米线','吉利丼咖喱饭','喜得美超级堡'],
        third_floor: ['熊猫猫智慧餐厅', '三汁焖锅', '彭城小地锅','超级烤肉饭','匠心卤','冯记烤鸭饭','瓦香鸡','酷堡王','太和板面','哎哟喂冒菜','隆江猪脚饭',
            '烤鸡焖面','煲玉小炒鸡','粥拾里','沙小龙','东北黏糊麻辣烫','尹大婶拌饭','馋肉娃辣椒炒肉','牛百碗特色面','茶香鸡热卤饭','川菜小炒','袁记云饺']
    }
};

// 定义偏好对应的菜品集合
const preferences = {
    rice: ['精品快餐1','瓦香鸡','黄焖鸡&米线','土豆泥拌饭','剁椒猪脚饭','精品快餐2','黄焖鸡米饭1','川渝盖浇饭','扬州炒饭','黄焖鸡米饭2','芜湖小炒','脆皮烤鸭饭','香酥鸡特色饭',
        '精品快餐3','喜多多自选盖饭','瓦香鸡米饭1','烤肉卤拌饭','瓦香鸡米饭2','营养快餐','吉利丼咖喱饭','超级烤肉饭','冯记烤鸭饭','瓦香鸡','隆江猪脚饭',
        '尹大婶拌饭','茶香鸡热卤饭'
    ],// 米饭相关菜品
    noodles: ['镇江锅盖面','青海拉面','重庆特色面','大碗面','兰州拉面民族风味','重庆小面','岳阳楼粉面馆','食太郎现炒浇头面','朱家小馆羊杂面','老母鸡牛肉汤面',
        '徐州老味米线','太和板面','烤鸡焖面','牛百碗特色面'
    ]   // 面食相关菜品
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
        resultElement.textContent = `小杰同学今日推荐的菜品为：  ${selectedDish}！`;

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
            resultElement.textContent = `小杰同学今日推荐的菜品为：  ${selectedDish}！`;

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
        resultElement.textContent = `小杰同学今日推荐的菜品为：  ${selectedDish}！`;

        // 更新下拉菜单的选择
        locationSelect.value = randomLocation;
        floorSelect.value = randomFloor;

        // 更新图片并显示图片容器
        updateDishImage(selectedDish);
        showImageContainer();
    }
}

function updateDishImage(dish) {
    // 从下拉菜单获取当前选择的值
    const location = locationSelect.value;
    const floor = floorSelect.value;

    // 构造图片路径
    const imagePath = `/images/${location}/${floor}/${dish}.jpg`;
    console.log("Location:", location);
    console.log("Floor:", floor);
    console.log("Generated Image Path:", imagePath);

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
