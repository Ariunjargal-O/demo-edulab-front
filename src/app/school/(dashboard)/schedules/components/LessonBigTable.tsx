"use client"
import React, { useState, useEffect } from 'react';

// Define proper TypeScript interfaces
interface School {
  id: string;
  name: string;
}

interface Season {
  id: string;
  name: string;
  isActive: boolean;
}

interface Teacher {
  firstName: string;
  lastName: string;
}

interface Subject {
  name: string;
}

interface GlobalSubject {
  name: string;
  code: string;
}

interface Group {
  groupName: string;
}

interface Grade {
  gradeNumber: string;
}

interface Schedule {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
  period: number;
  teacher: Teacher;
  schoolSubject: Subject;
  globalSubject: GlobalSubject;
  group: Group;
  grade: Grade;
}

interface ScheduleData {
  schools: School[];
  seasons: Season[];
  schedules: Schedule[];
}

interface TeacherSchedule {
  [day: string]: {
    [period: number]: string;
  };
}

interface TeacherData {
  teacher: Teacher;
  schedule: TeacherSchedule;
}

interface OrganizedSchedule {
  [subjectName: string]: {
    [teacherName: string]: TeacherData;
  };
}

export default function DatabaseLessonSchedule() {
  const [scheduleData, setScheduleData] = useState<ScheduleData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSchool, setSelectedSchool] = useState('');
  const [selectedSeason, setSelectedSeason] = useState('');

  // Mock data with proper typing
  const mockData: ScheduleData = {
    schools: [
      { id: '1', name: '1-р сургууль' },
      { id: '2', name: '2-р сургууль' }
    ],
    seasons: [
      { id: '1', name: '1-р улирал', isActive: true },
      { id: '2', name: '2-р улирал', isActive: false }
    ],
    schedules: [
      {
        id: '1',
        day: 'MONDAY',
        startTime: '08:00',
        endTime: '08:40',
        period: 1,
        teacher: { firstName: 'Б.', lastName: 'Батбаяр' },
        schoolSubject: { name: 'Математик' },
        globalSubject: { name: 'Математик', code: 'MATH001' },
        group: { groupName: '10А' },
        grade: { gradeNumber: '10' }
      },
      {
        id: '2',
        day: 'MONDAY',
        startTime: '09:30',
        endTime: '10:10',
        period: 3,
        teacher: { firstName: 'Б.', lastName: 'Батбаяр' },
        schoolSubject: { name: 'Математик' },
        globalSubject: { name: 'Математик', code: 'MATH001' },
        group: { groupName: '9В' },
        grade: { gradeNumber: '9' }
      },
      {
        id: '3',
        day: 'TUESDAY',
        startTime: '08:00',
        endTime: '08:40',
        period: 1,
        teacher: { firstName: 'Б.', lastName: 'Батбаяр' },
        schoolSubject: { name: 'Математик' },
        globalSubject: { name: 'Математик', code: 'MATH001' },
        group: { groupName: '11А' },
        grade: { gradeNumber: '11' }
      }
    ]
  };

  // Database-аас мэдээлэл татах функц
  const fetchScheduleData = async () => {
    try {
      setLoading(true);
      
      // Бодит ажиллагаанд энэ хэсэгт API дуудлага хийнэ
      // const response = await fetch('/api/schedules', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ schoolId: selectedSchool, seasonId: selectedSeason })
      // });
      // const data = await response.json();
      
      // Одоогоор жишээ өгөгдөл ашиглая
      setTimeout(() => {
        setScheduleData(mockData);
        setLoading(false);
      }, 1000);
      
    } catch (err) {
      setError('Мэдээлэл татахад алдаа гарлаа');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchScheduleData();
  }, [selectedSchool, selectedSeason]);

  // Өдрүүдийг англи хэлнээс монгол хэлрүү хөрвүүлэх
  const translateDay = (day: string): string => {
    const dayMap: { [key: string]: string } = {
      'MONDAY': 'Даваа',
      'TUESDAY': 'Мягмар',
      'WEDNESDAY': 'Лхагва',
      'THURSDAY': 'Пүрэв',
      'FRIDAY': 'Баасан',
      'SATURDAY': 'Бямба',
      'SUNDAY': 'Ням'
    };
    return dayMap[day] || day;
  };

  // Цагийн хуваарь
  const timeSlots = [
    { period: 1, time: '08:00 - 08:40' },
    { period: 2, time: '08:45 - 09:25' },
    { period: 3, time: '09:30 - 10:10' },
    { period: 4, time: '10:15 - 11:05' },
    { period: 5, time: '11:10 - 11:50' },
    { period: 6, time: '11:55 - 12:35' },
    { period: 7, time: '12:35 - 13:05' }
  ];

  // Багш нараар бүлэглэсэн хуваарь үүсгэх
  const organizeScheduleByTeacher = (schedules: Schedule[]): OrganizedSchedule => {
    const organized: OrganizedSchedule = {};
    
    schedules.forEach(schedule => {
      const teacherName = `${schedule.teacher.firstName}${schedule.teacher.lastName}`;
      const subjectName = schedule.schoolSubject.name;
      
      if (!organized[subjectName]) {
        organized[subjectName] = {};
      }
      
      if (!organized[subjectName][teacherName]) {
        organized[subjectName][teacherName] = {
          teacher: schedule.teacher,
          schedule: {
            'Даваа': {},
            'Мягмар': {},
            'Лхагва': {},
            'Пүрэв': {},
            'Баасан': {}
          }
        };
      }
      
      const day = translateDay(schedule.day);
      const period = schedule.period || Math.floor((parseInt(schedule.startTime.split(':')[0]) - 8) / 1) + 1;
      const className = schedule.group.groupName;
      
      organized[subjectName][teacherName].schedule[day][period] = className;
    });
    
    return organized;
  };

  if (loading) {
    return (
      <div className="p-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Хуваарь ачааллаж байна...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
        <button 
          onClick={fetchScheduleData}
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Дахин оролдох
        </button>
      </div>
    );
  }

  if (!scheduleData) return null;

  const organizedSchedule = organizeScheduleByTeacher(scheduleData.schedules);
  const days = ["Даваа", "Мягмар", "Лхагва", "Пүрэв", "Баасан"];
  const periods = [1, 2, 3, 4, 5, 6, 7];

  return (
    <div className="max-w-full mx-auto overflow-x-auto">
      {/* Хяналтын хэсэг */}
      <div className="mb-6 bg-gray-50 p-4 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Сургууль сонгох
            </label>
            <select 
              value={selectedSchool}
              onChange={(e) => setSelectedSchool(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Бүх сургууль</option>
              {scheduleData.schools.map(school => (
                <option key={school.id} value={school.id}>
                  {school.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Улирал сонгох
            </label>
            <select 
              value={selectedSeason}
              onChange={(e) => setSelectedSeason(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Бүх улирал</option>
              {scheduleData.seasons.map(season => (
                <option key={season.id} value={season.id}>
                  {season.name} {season.isActive ? '(Идэвхтэй)' : ''}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Гарчиг */}
      <div className="mb-4 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Онлайн хичээлийн хуваарь</h1>
        <p className="text-sm text-gray-600">Database-тай холбосон хувилбар</p>
        <p className="text-sm text-gray-600">2024-2025 оны хичээлийн жил</p>
        <div className="mt-2 flex justify-center space-x-4 text-sm text-gray-500">
          <span>Нийт хичээл: {Object.keys(organizedSchedule).length}</span>
          <span>Нийт хуваарь: {scheduleData.schedules.length}</span>
        </div>
      </div>

      {/* Хуваарийн хүснэгт */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-400 bg-white text-xs">
          {/* Толгой хэсэг */}
          <thead>
            {/* Гарагийн нэрс */}
            <tr className="bg-blue-100">
              <th className="border border-gray-400 p-1 w-24">Хичээл</th>
              <th className="border border-gray-400 p-1 w-8 text-center">№</th>
              <th className="border border-gray-400 p-1 w-32">Багш</th>
              {days.map((day) => (
                <th key={day} className="border border-gray-400 p-1 text-center" colSpan={7}>
                  {day}
                </th>
              ))}
            </tr>
            {/* Цагийн дугаарууд */}
            <tr className="bg-blue-50">
              <th className="border border-gray-400 p-1"></th>
              <th className="border border-gray-400 p-1"></th>
              <th className="border border-gray-400 p-1"></th>
              {days.map((day) =>
                periods.map((period) => (
                  <th key={`${day}-${period}`} className="border border-gray-400 p-1 w-12 text-center">
                    {period}
                  </th>
                )),
              )}
            </tr>
          </thead>
          <tbody>
            {Object.entries(organizedSchedule).map(([subjectName, teachers], subjectIndex) =>
              Object.entries(teachers).map(([teacherName, teacherData], teacherIndex) => (
                <tr
                  key={`${subjectIndex}-${teacherIndex}`}
                  className={subjectIndex % 2 === 0 ? "bg-gray-50" : "bg-white"}
                >
                  {/* Хичээлийн нэр - зөвхөн эхний багшийн мөрөнд харуулна */}
                  {teacherIndex === 0 && (
                    <td
                      className="border border-gray-400 p-1 font-medium text-center align-middle"
                      rowSpan={Object.keys(teachers).length}
                    >
                      {subjectName}
                    </td>
                  )}
                  {/* Багшийн дэс дугаар */}
                  <td className="border border-gray-400 p-1 text-center font-medium">{teacherIndex + 1}</td>
                  {/* Багшийн нэр */}
                  <td className="border border-gray-400 p-1 text-xs">
                    {teacherData.teacher.firstName}{teacherData.teacher.lastName}
                  </td>
                  {/* Хичээлийн хуваарь */}
                  {days.map((day) =>
                    periods.map((period) => {
                      const className = teacherData.schedule[day]?.[period] || ""
                      return (
                        <td key={`${day}-${period}`} className="border border-gray-400 p-1 text-center">
                          {className && (
                            <div className="text-xs font-medium text-blue-700 bg-blue-50 rounded px-1">
                              {className}
                            </div>
                          )}
                        </td>
                      )
                    }),
                  )}
                </tr>
              )),
            )}
          </tbody>
        </table>
      </div>

      {/* Цагийн хуваарь */}
      <div className="mt-6 bg-gray-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-3 text-sm">Цагийн хуваарь</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          {timeSlots.map((slot) => (
            <div key={slot.period} className="bg-white p-3 rounded border shadow-sm">
              <div className="font-bold text-blue-600">{slot.period}-р цаг</div>
              <div className="text-gray-600">{slot.time}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Database статистик */}
      <div className="mt-6 bg-green-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-3 text-sm text-green-800">Database мэдээлэл</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div className="bg-white p-3 rounded border">
            <div className="font-bold text-green-600">Сургуулийн тоо</div>
            <div className="text-2xl font-bold text-green-700">{scheduleData.schools.length}</div>
          </div>
          <div className="bg-white p-3 rounded border">
            <div className="font-bold text-green-600">Улирлын тоо</div>
            <div className="text-2xl font-bold text-green-700">{scheduleData.seasons.length}</div>
          </div>
          <div className="bg-white p-3 rounded border">
            <div className="font-bold text-green-600">Хичээлийн тоо</div>
            <div className="text-2xl font-bold text-green-700">{Object.keys(organizedSchedule).length}</div>
          </div>
          <div className="bg-white p-3 rounded border">
            <div className="font-bold text-green-600">Нийт хуваарь</div>
            <div className="text-2xl font-bold text-green-700">{scheduleData.schedules.length}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// export default function LessonBigTable() {

//   // Хичээлүүдийг багш нартай нь бүлэглэсэн
//   const subjects = [
//     {
//       name: "Математик",
//       teachers: [
//         {
//           id: 1,
//           name: "Б.Батбаяр",
//           schedule: {
//             Даваа: { 1: "10А", 2: "", 3: "9В", 4: "", 5: "", 6: "", 7: "" },
//             Мягмар: { 1: "11А", 2: "9Б", 3: "", 4: "10Б", 5: "", 6: "", 7: "" },
//             Лхагва: { 1: "8В", 2: "10А", 3: "", 4: "11А", 5: "", 6: "", 7: "" },
//             Пүрэв: { 1: "9В", 2: "", 3: "11В", 4: "", 5: "", 6: "", 7: "" },
//             Баасан: { 1: "10В", 2: "", 3: "8В", 4: "", 5: "", 6: "", 7: "" },
//           },
//         },
//         {
//           id: 2,
//           name: "Д.Дорж",
//           schedule: {
//             Даваа: { 1: "", 2: "10А", 3: "", 4: "", 5: "", 6: "", 7: "" },
//             Мягмар: { 1: "", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "" },
//             Лхагва: { 1: "", 2: "", 3: "9А", 4: "", 5: "", 6: "", 7: "" },
//             Пүрэв: { 1: "", 2: "10Б", 3: "", 4: "9В", 5: "", 6: "", 7: "" },
//             Баасан: { 1: "", 2: "11Б", 3: "", 4: "10В", 5: "", 6: "", 7: "" },
//           },
//         },
//         {
//           id: 3,
//           name: "С.Сайхан",
//           schedule: {
//             Даваа: { 1: "", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "" },
//             Мягмар: { 1: "", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "" },
//             Лхагва: { 1: "", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "" },
//             Пүрэв: { 1: "", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "" },
//             Баасан: { 1: "", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "" },
//           },
//         },
//       ],
//     },
//     {
//       name: "Монгол хэл",
//       teachers: [
//         {
//           id: 1,
//           name: "Ц.Цэцэгмаа",
//           schedule: {
//             Даваа: { 1: "9Б", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "" },
//             Мягмар: { 1: "", 2: "11В", 3: "8А", 4: "", 5: "", 6: "", 7: "" },
//             Лхагва: { 1: "10В", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "" },
//             Пүрэв: { 1: "8Б", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "" },
//             Баасан: { 1: "", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "" },
//           },
//         },
//         {
//           id: 2,
//           name: "Н.Нарантуяа",
//           schedule: {
//             Даваа: { 1: "", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "" },
//             Мягмар: { 1: "", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "" },
//             Лхагва: { 1: "", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "" },
//             Пүрэв: { 1: "", 2: "10Б", 3: "", 4: "", 5: "", 6: "", 7: "" },
//             Баасан: { 1: "", 2: "11Б", 3: "", 4: "10В", 5: "", 6: "", 7: "" },
//           },
//         },
//       ],
//     },
//     {
//       name: "Англи хэл",
//       teachers: [
//         {
//           id: 1,
//           name: "М.Мөнхбат",
//           schedule: {
//             Даваа: { 1: "", 2: "8В", 3: "10Б", 4: "", 5: "", 6: "", 7: "" },
//             Мягмар: { 1: "9А", 2: "", 3: "11Б", 4: "8Б", 5: "", 6: "", 7: "" },
//             Лхагва: { 1: "", 2: "11А", 3: "8А", 4: "10В", 5: "", 6: "", 7: "" },
//             Пүрэв: { 1: "", 2: "9А", 3: "10А", 4: "", 5: "", 6: "", 7: "" },
//             Баасан: { 1: "8А", 2: "", 3: "11В", 4: "", 5: "", 6: "", 7: "" },
//           },
//         },
//         {
//           id: 2,
//           name: "О.Оюунчимэг",
//           schedule: {
//             Даваа: { 1: "", 2: "", 3: "8А", 4: "", 5: "", 6: "", 7: "" },
//             Мягмар: { 1: "", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "" },
//             Лхагва: { 1: "", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "" },
//             Пүрэв: { 1: "", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "" },
//             Баасан: { 1: "", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "" },
//           },
//         },
//         {
//           id: 3,
//           name: "Г.Ганбаатар",
//           schedule: {
//             Даваа: { 1: "", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "" },
//             Мягмар: { 1: "", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "" },
//             Лхагва: { 1: "", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "" },
//             Пүрэв: { 1: "", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "" },
//             Баасан: { 1: "", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "" },
//           },
//         },
//       ],
//     },
//     {
//       name: "Физик",
//       teachers: [
//         {
//           id: 1,
//           name: "Ж.Жавхлан",
//           schedule: {
//             Даваа: { 1: "11В", 2: "", 3: "", 4: "10В", 5: "", 6: "", 7: "" },
//             Мягмар: { 1: "", 2: "10А", 3: "", 4: "9А", 5: "", 6: "", 7: "" },
//             Лхагва: { 1: "11Б", 2: "", 3: "10Б", 4: "", 5: "", 6: "", 7: "" },
//             Пүрэв: { 1: "", 2: "8В", 3: "", 4: "11А", 5: "", 6: "", 7: "" },
//             Баасан: { 1: "9Б", 2: "10А", 3: "", 4: "8А", 5: "", 6: "", 7: "" },
//           },
//         },
//         {
//           id: 2,
//           name: "Р.Рэнцэн",
//           schedule: {
//             Даваа: { 1: "", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "" },
//             Мягмар: { 1: "", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "" },
//             Лхагва: { 1: "", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "" },
//             Пүрэв: { 1: "", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "" },
//             Баасан: { 1: "", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "" },
//           },
//         },
//       ],
//     },
//     {
//       name: "Хими",
//       teachers: [
//         {
//           id: 1,
//           name: "Л.Лхагва",
//           schedule: {
//             Даваа: { 1: "", 2: "9А", 3: "", 4: "11Б", 5: "", 6: "", 7: "" },
//             Мягмар: { 1: "10Б", 2: "", 3: "9В", 4: "", 5: "", 6: "", 7: "" },
//             Лхагва: { 1: "", 2: "8Б", 3: "", 4: "9Б", 5: "", 6: "", 7: "" },
//             Пүрэв: { 1: "11А", 2: "", 3: "8А", 4: "", 5: "", 6: "", 7: "" },
//             Баасан: { 1: "", 2: "9В", 3: "10Б", 4: "", 5: "", 6: "", 7: "" },
//           },
//         },
//         {
//           id: 2,
//           name: "Б.Болормаа",
//           schedule: {
//             Даваа: { 1: "", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "" },
//             Мягмар: { 1: "", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "" },
//             Лхагва: { 1: "", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "" },
//             Пүрэв: { 1: "", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "" },
//             Баасан: { 1: "", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "" },
//           },
//         },
//       ],
//     },
//   ]

//   const days = ["Даваа", "Мягмар", "Лхагва", "Пүрэв", "Баасан"]
//   const periods = [1, 2, 3, 4, 5, 6, 7]

//   return (
//     <div className="p-4 max-w-full mx-auto overflow-x-auto">
//       <div className="mb-4 text-center">
//         <h1 className="text-xl font-bold text-gray-800 mb-1">Онлайн хичээлийн хуваарь</h1>
//         <p className="text-sm text-gray-600">1-р улирал</p>
//         <p className="text-sm text-gray-600">2024-2025 оны хичээлийн жил</p>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="w-full border-collapse border border-gray-400 bg-white text-xs">
//           {/* Толгой хэсэг */}
//           <thead>
//             {/* Гарагийн нэрс */}
//             <tr className="bg-blue-100">
//               <th className="border border-gray-400 p-1 w-24">Хичээл</th>
//               <th className="border border-gray-400 p-1 w-8 text-center">№</th>
//               <th className="border border-gray-400 p-1 w-32">Багш</th>
//               {days.map((day) => (
//                 <th key={day} className="border border-gray-400 p-1 text-center" colSpan={7}>
//                   {day}
//                 </th>
//               ))}
//             </tr>
//             {/* Цагийн дугаарууд */}
//             <tr className="bg-blue-50">
//               <th className="border border-gray-400 p-1"></th>
//               <th className="border border-gray-400 p-1"></th>
//               <th className="border border-gray-400 p-1"></th>
//               {days.map((day) =>
//                 periods.map((period) => (
//                   <th key={`${day}-${period}`} className="border border-gray-400 p-1 w-12 text-center">
//                     {period}
//                   </th>
//                 )),
//               )}
//             </tr>
//           </thead>
//           <tbody>
//             {subjects.map((subject, subjectIndex) =>
//               subject.teachers.map((teacher, teacherIndex) => (
//                 <tr
//                   key={`${subjectIndex}-${teacherIndex}`}
//                   className={subjectIndex % 2 === 0 ? "bg-gray-50" : "bg-white"}
//                 >
//                   {/* Хичээлийн нэр - зөвхөн эхний багшийн мөрөнд харуулна */}
//                   {teacherIndex === 0 && (
//                     <td
//                       className="border border-gray-400 p-1 font-medium text-center align-middle"
//                       rowSpan={subject.teachers.length}
//                     >
//                       {subject.name}
//                     </td>
//                   )}
//                   {/* Багшийн дэс дугаар */}
//                   <td className="border border-gray-400 p-1 text-center font-medium">{teacher.id}</td>
//                   {/* Багшийн нэр */}
//                   <td className="border border-gray-400 p-1 text-xs">{teacher.name}</td>
//                   {/* Хичээлийн хуваарь */}
//                   {days.map((day) =>
//                     periods.map((period) => {
//                       const className = teacher.schedule[day][period] || ""
//                       return (
//                         <td key={`${day}-${period}`} className="border border-gray-400 p-1 text-center">
//                           {className && <div className="text-xs font-medium text-blue-700">{className}</div>}
//                         </td>
//                       )
//                     }),
//                   )}
//                 </tr>
//               )),
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Цагийн хуваарь */}
//       <div className="mt-4 bg-gray-50 p-3 rounded">
//         <h3 className="font-semibold mb-2 text-sm">Цагийн хуваарь</h3>
//         <div className="grid grid-cols-4 gap-2 text-xs">
//           <div className="bg-white p-2 rounded border">
//             <div className="font-bold">1-р цаг</div>
//             <div>08:00 - 08:40</div>
//           </div>
//           <div className="bg-white p-2 rounded border">
//             <div className="font-bold">2-р цаг</div>
//             <div>08:50 - 09:30</div>
//           </div>
//           <div className="bg-white p-2 rounded border">
//             <div className="font-bold">3-р цаг</div>
//             <div>09:40 - 10:20</div>
//           </div>
//           <div className="bg-white p-2 rounded border">
//             <div className="font-bold">4-р цаг</div>
//             <div>10:30 - 11:10</div>
//           </div>
//           <div className="bg-white p-2 rounded border">
//             <div className="font-bold">5-р цаг</div>
//             <div>11:20 - 12:00</div>
//           </div>
//           <div className="bg-white p-2 rounded border">
//             <div className="font-bold">6-р цаг</div>
//             <div>13:00 - 13:40</div>
//           </div>
//           <div className="bg-white p-2 rounded border">
//             <div className="font-bold">7-р цаг</div>
//             <div>13:50 - 14:30</div>
//           </div>
//           <div className="bg-yellow-100 p-2 rounded border">
//             <div className="font-bold">Амралт</div>
//             <div>12:00 - 13:00</div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }
