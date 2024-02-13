const UNIVERSITIES = "universities";
const USERS = "users";
const DEPARTMENTS = "departments";
const COURSES = "courses";
const COURSE = "course";
const MATERIALS = "materials";
const MODULES = "modules";

export const endpoints = {
  auth: {
    login: USERS + "/login",
    register: USERS,
    forgotPassword: USERS + "/forgot-password",
    changePassword: USERS,
    resetPassword: USERS + "/reset-password",
  },
  users: {
    get: USERS,
    verifyUser: USERS,
    getUsers: USERS,
    deleteUser: USERS,
  },
  universities: {
    get: UNIVERSITIES,
    getOne: UNIVERSITIES,
    create: UNIVERSITIES,
    update: UNIVERSITIES,
    delete: UNIVERSITIES,
  },
  departments: {
    get: DEPARTMENTS,
    create: DEPARTMENTS,
    getOne: DEPARTMENTS,
    update: DEPARTMENTS,
    delete: DEPARTMENTS,
  },
  courses: {
    get: COURSES,
    getOne: COURSES,
    update: COURSES,
    delete: COURSES,
    create: COURSES,
    tutorCourses: COURSES + "/tutor/my-courses",
    enroll: COURSES + "/enroll",
    studentCourses: COURSES + "/student/my-courses",
  },
  modules: {
    get: `${COURSES}`,
    create: `${COURSES}/${COURSE}-${MODULES}`,
  },
  materials: {
    get: MATERIALS,
    getOne: MATERIALS,
    update: MATERIALS,
    delete: MATERIALS,
    create: MATERIALS,
  },
};
