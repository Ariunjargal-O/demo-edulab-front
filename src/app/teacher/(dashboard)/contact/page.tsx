import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  import { Button } from "@/components/ui/button"
  import { PhoneCall, Mail } from "lucide-react"
  
  const teachers = [
    {
      name: "Ц. Батцэцэг",
      department: "Математик",
      phone: "99112233",
      email: "bat@school.edu",
      room: "А-203",
      position: "Ахлах багш",
      image: "teacher.avif",
    },
    {
      name: "Б. Энхтүвшин",
      department: "Физик",
      phone: "88119900",
      email: "enkh@school.edu",
      room: "В-105",
      position: "Тэнхимийн эрхлэгч",
      image: "teacher.avif",
    },
    {
      name: "О. Номин",
      department: "Гадаад хэл",
      phone: "99008811",
      email: "nomin@school.edu",
      room: "С-301",
      position: "Багш",
      image: "teacher.avif",
    },
  ]
  
  export default function Page() {
    return (
      <div className="p-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-8">
          Багш нарын холбоо барих мэдээлэл
        </h2>
        <div className="overflow-x-auto rounded-2xl shadow-lg border border-gray-200 bg-white">
          <Table>
            <TableHeader>
              <TableRow className="bg-indigo-50 text-indigo-700">
                <TableHead className="font-semibold">Нэр</TableHead>
                <TableHead className="font-semibold">Тэнхим</TableHead>
                <TableHead className="font-semibold">Албан тушаал</TableHead>
                <TableHead className="font-semibold">Өрөө</TableHead>
                <TableHead className="font-semibold">Утас</TableHead>
                <TableHead className="font-semibold">Имэйл</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teachers.map((teacher, index) => (
                <TableRow key={index} className="hover:bg-gray-50 transition-colors">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <img
                        src={teacher.image}
                        alt={teacher.name}
                        className="w-8 h-8 rounded-full object-cover border border-gray-300"
                      />
                      <span className="font-medium text-gray-800">{teacher.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{teacher.department}</TableCell>
                  <TableCell>{teacher.position}</TableCell>
                  <TableCell>{teacher.room}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span>{teacher.phone}</span>
                      <a href={`tel:${teacher.phone}`}>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-indigo-600 hover:text-indigo-800"
                        >
                          <PhoneCall className="w-4 h-4" />
                        </Button>
                      </a>
                    </div>
                  </TableCell>
                  <TableCell>
                    <a
                      href={`mailto:${teacher.email}`}
                      className="text-blue-600 hover:underline text-sm"
                    >
                      {teacher.email}
                    </a>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    )
  }
  