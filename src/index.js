// Name, surname, position, company, experience, courses, contacts
var School = /** @class */ (function () {
    function School() {
        // implement 'add area', 'remove area', 'add lecturer', and 'remove lecturer' methods
        this._areas = [];
        this._lecturers = [];
    }
    School.prototype.addArea = function (area) {
        this._areas.push(area);
    };
    School.prototype.removeArea = function (area) {
        this._areas = this._areas.filter(function (item) { return item !== area; });
    };
    School.prototype.addLecturer = function (lecturer) {
        this._lecturers.push(lecturer);
    };
    School.prototype.removeLecturer = function (lecturer) {
        this._lecturers = this._lecturers.filter(function (item) { return item !== lecturer; });
    };
    Object.defineProperty(School.prototype, "areas", {
        get: function () {
            return this._areas;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(School.prototype, "lecturers", {
        get: function () {
            return this._lecturers;
        },
        enumerable: false,
        configurable: true
    });
    return School;
}());
var Area = /** @class */ (function () {
    function Area(name) {
        // implement getters for fields and 'add/remove level' methods
        this._levels = [];
        this._name = name;
    }
    Object.defineProperty(Area.prototype, "levels", {
        get: function () {
            return this._levels;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Area.prototype, "name", {
        get: function () {
            return this._name;
        },
        enumerable: false,
        configurable: true
    });
    Area.prototype.addLevel = function (level) {
        this._levels.push(level);
    };
    Area.prototype.removeLevel = function (level) {
        this._levels = this._levels.filter(function (item) { return item !== level; });
    };
    return Area;
}());
var Level = /** @class */ (function () {
    function Level(name, description) {
        // implement getters for fields and 'add/remove group' methods
        this._groups = [];
        this._name = name;
        this._description = description;
    }
    Object.defineProperty(Level.prototype, "groups", {
        get: function () {
            return this._groups;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Level.prototype, "name", {
        get: function () {
            return this._name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Level.prototype, "description", {
        get: function () {
            return this._description;
        },
        enumerable: false,
        configurable: true
    });
    Level.prototype.addGroup = function (group) {
        this._groups.push(group);
    };
    Level.prototype.removeGroup = function (group) {
        this._groups = this._groups.filter(function (item) { return item !== group; });
    };
    return Level;
}());
var GroupStatus;
(function (GroupStatus) {
    GroupStatus["ACTIVE"] = "Active";
    GroupStatus["INACTIVE"] = "Inactive";
    GroupStatus["PENDING"] = "Pending";
})(GroupStatus || (GroupStatus = {}));
var Group = /** @class */ (function () {
    function Group(directionName, levelName) {
        this._status = GroupStatus.PENDING;
        this._students = [];
        this._area = new Area(levelName);
        this._status = GroupStatus.PENDING;
        this.directionName = directionName;
        this.levelName = levelName;
    }
    Object.defineProperty(Group.prototype, "area", {
        get: function () {
            return this._area;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Group.prototype, "status", {
        get: function () {
            return this._status;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Group.prototype, "students", {
        get: function () {
            return this._students;
        },
        enumerable: false,
        configurable: true
    });
    Group.prototype.addStudent = function (student) {
        this._students.push(student);
    };
    Group.prototype.removeStudent = function (student) {
        this._students = this._students.filter(function (item) { return item !== student; });
        return this._students;
    };
    Group.prototype.setStatus = function (status) {
        this._status = status;
    };
    // Modify the array so that it has a valid toSorted method*
    Group.prototype.showPerformance = function () {
        var sortedStudents = this.students
            .slice()
            .sort(function (a, b) {
            return b.getPerformanceRating() - a.getPerformanceRating();
        });
        return sortedStudents;
    };
    return Group;
}());
var Student = /** @class */ (function () {
    function Student(firstName, lastName, birthYear) {
        this._grades = []; // workName: mark
        this._visits = []; // lesson: present
        this._firstName = firstName;
        this._lastName = lastName;
        this._birthYear = birthYear;
    }
    Object.defineProperty(Student.prototype, "fullName", {
        get: function () {
            return "".concat(this._lastName, " ").concat(this._firstName);
        },
        set: function (value) {
            var _a;
            _a = value.split(" "), this._lastName = _a[0], this._firstName = _a[1];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Student.prototype, "age", {
        get: function () {
            return new Date().getFullYear() - this._birthYear;
        },
        enumerable: false,
        configurable: true
    });
    Student.prototype.setGrades = function (grades) {
        this._grades = grades;
    };
    Student.prototype.setVisit = function (visits) {
        this._visits = visits;
    };
    Student.prototype.getPerformanceRating = function () {
        var gradeValues = Object.values(this._grades);
        if (!gradeValues.length)
            return 0;
        var averageGrade = gradeValues.reduce(function (sum, grade) { return sum + grade; }, 0) /
            gradeValues.length;
        var attendancePercentage = (this._visits.filter(function (present) { return present; }).length / this._visits.length) *
            100;
        return (averageGrade + attendancePercentage) / 2;
    };
    return Student;
}());
