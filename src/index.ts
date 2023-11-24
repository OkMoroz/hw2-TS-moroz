// Name, surname, position, company, experience, courses, contacts

interface Lecturer {
  name: string;
  surname: string;
  position: number;
  company: string;
  experience: string;
  course: string[];
  contact: string;
}

class School {
  // implement 'add area', 'remove area', 'add lecturer', and 'remove lecturer' methods

  _areas: Area[] = [];
  _lecturers: Lecturer[] = [];

  addArea(area: Area): void {
    this._areas.push(area);
  }

  removeArea(area: Area): void {
    this._areas = this._areas.filter((item) => item !== area);
  }

  addLecturer(lecturer: Lecturer): void {
    this._lecturers.push(lecturer);
  }

  removeLecturer(lecturer: Lecturer): void {
    this._lecturers = this._lecturers.filter((item) => item !== lecturer);
  }

  get areas(): Area[] {
    return this._areas;
  }

  get lecturers(): Lecturer[] {
    return this._lecturers;
  }
}

class Area {
  // implement getters for fields and 'add/remove level' methods

  _levels: Level[] = [];
  _name: string;

  constructor(name: string) {
    this._name = name;
  }

  get levels(): Level[] {
    return this._levels;
  }

  get name(): string {
    return this._name;
  }

  addLevel(level: Level): void {
    this._levels.push(level);
  }

  removeLevel(level: Level): void {
    this._levels = this._levels.filter((item) => item !== level);
  }
}

class Level {
  // implement getters for fields and 'add/remove group' methods

  _groups: Group[] = [];
  _name: string;
  _description: string[];

  constructor(name: string, description: string[]) {
    this._name = name;
    this._description = description;
  }

  get groups(): Group[] {
    return this._groups;
  }

  get name(): string {
    return this._name;
  }

  get description(): string[] {
    return this._description;
  }

  addGroup(group: Group): void {
    this._groups.push(group);
  }

  removeGroup(group: Group): void {
    this._groups = this._groups.filter((item) => item !== group);
  }
}

class Group {
  // implement getters for fields and 'add/remove student' and 'set status' methods

  _area: Area;
  _status: string;
  _students: Student[] = [];
  directionName: string;
  levelName: string;

  constructor(directionName: string, levelName: string) {
    this._area = new Area(levelName);
    this._status = "";
    this.directionName = directionName;
    this.levelName = levelName;
  }

  get area(): Area {
    return this._area;
  }

  get status(): string {
    return this._status;
  }

  get students(): Student[] {
    return this._students;
  }

  addStudent(student: Student): void {
    this._students.push(student);
  }
  removeStudent(student: Student): void {
    this._students = this._students.filter((item) => item !== student);
  }

  setStatus(status: string): void {
    this._status = status;
  }

  // Modify the array so that it has a valid toSorted method*

  showPerformance(): Student[] {
    const sortedStudents = this.students
      .slice()
      .sort(
        (a: Student, b: Student) =>
          b.getPerformanceRating() - a.getPerformanceRating()
      );

    return sortedStudents;
  }
}

class Student {
  // implement 'set grade' and 'set visit' methods

  _firstName: string;
  _lastName: string;
  _birthYear: number;
  _grades: number[] = []; // workName: mark
  _visits: boolean[] = []; // lesson: present

  constructor(firstName: string, lastName: string, birthYear: number) {
    this._firstName = firstName;
    this._lastName = lastName;
    this._birthYear = birthYear;
  }

  get fullName() {
    return `${this._lastName} ${this._firstName}`;
  }

  set fullName(value) {
    [this._lastName, this._firstName] = value.split(" ");
  }

  get age() {
    return new Date().getFullYear() - this._birthYear;
  }

  setGrades(grades: number[]): void {
    this._grades = grades;
  }

  setVisit(visits: boolean[]): void {
    this._visits = visits;
  }

  getPerformanceRating(): number {
    const gradeValues: number[] = Object.values(this._grades);

    if (!gradeValues.length) return 0;

    const averageGrade =
      gradeValues.reduce((sum: number, grade: number) => sum + grade, 0) /
      gradeValues.length;
    const attendancePercentage =
      (this._visits.filter((present) => present).length / this._visits.length) *
      100;

    return (averageGrade + attendancePercentage) / 2;
  }
}
