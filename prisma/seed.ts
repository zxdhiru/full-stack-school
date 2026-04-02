import { PrismaClient, UserSex, Day } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding minimal data...");

  // ADMIN
  await prisma.admin.create({
    data: {
      id: "admin1",
      username: "admin1",
    },
  });

  // GRADE
  await prisma.grade.create({
    data: {
      id: 1,
      level: 1,
    },
  });

  // CLASS
  await prisma.class.create({
    data: {
      id: 1,
      name: "1A",
      gradeId: 1,
      capacity: 20,
    },
  });

  // SUBJECT
  await prisma.subject.create({
    data: {
      id: 1,
      name: "Mathematics",
    },
  });

  // TEACHER
  await prisma.teacher.create({
    data: {
      id: "teacher1",
      username: "teacher1",
      name: "John",
      surname: "Doe",
      email: "teacher1@example.com",
      phone: "1234567890",
      address: "Address 1",
      bloodType: "A+",
      sex: UserSex.MALE,
      birthday: new Date("1990-01-01"),

      subjects: {
        connect: [{ id: 1 }],
      },
      classes: {
        connect: [{ id: 1 }],
      },
    },
  });

  // LESSON
  await prisma.lesson.create({
    data: {
      id: 1,
      name: "Lesson 1",
      day: Day.MONDAY,
      startTime: new Date(),
      endTime: new Date(),
      subjectId: 1,
      classId: 1,
      teacherId: "teacher1",
    },
  });

  // PARENT
  await prisma.parent.create({
    data: {
      id: "parent1",
      username: "parent1",
      name: "Parent",
      surname: "One",
      email: "parent1@example.com",
      phone: "9999999999",
      address: "Address P1",
    },
  });

  // STUDENT
  await prisma.student.create({
    data: {
      id: "student1",
      username: "student1",
      name: "Student",
      surname: "One",
      email: "student1@example.com",
      phone: "8888888888",
      address: "Address S1",
      bloodType: "O+",
      sex: UserSex.FEMALE,
      birthday: new Date("2015-01-01"),

      parentId: "parent1",
      gradeId: 1,
      classId: 1,
    },
  });

  // EXAM
  await prisma.exam.create({
    data: {
      id: 1,
      title: "Exam 1",
      startTime: new Date(),
      endTime: new Date(),
      lessonId: 1,
    },
  });

  // ASSIGNMENT
  await prisma.assignment.create({
    data: {
      id: 1,
      title: "Assignment 1",
      startDate: new Date(),
      dueDate: new Date(),
      lessonId: 1,
    },
  });

  // RESULT (linked to exam)
  await prisma.result.create({
    data: {
      id: 1,
      score: 95,
      studentId: "student1",
      examId: 1,
    },
  });

  // ATTENDANCE
  await prisma.attendance.create({
    data: {
      id: 1,
      date: new Date(),
      present: true,
      studentId: "student1",
      lessonId: 1,
    },
  });

  // EVENT
  await prisma.event.create({
    data: {
      id: 1,
      title: "Event 1",
      description: "Sample event",
      startTime: new Date(),
      endTime: new Date(),
      classId: 1,
    },
  });

  // ANNOUNCEMENT
  await prisma.announcement.create({
    data: {
      id: 1,
      title: "Announcement 1",
      description: "Sample announcement",
      date: new Date(),
      classId: 1,
    },
  });

  console.log("✅ Minimal seed completed successfully");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Seed failed:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
