"use client"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  BookOpen,
  Edit,
  Plus,
  Save,
  X,
  Calendar,
  Clock,
  Target,
  FileText,
  ChevronDown,
  ChevronUp,
  Users,
  Award,
  Download,
  Trash2,
  Table,
  List,
  Filter,
  Search,
} from "lucide-react"

// Define types for the curriculum data
type Topic = {
  id: number
  title: string
  duration: string
  startDate: string
  endDate: string
  objectives: string[]
  content: string
  activities: string[]
  assessment: string
  resources: string[]
  difficulty: string
  completed: boolean
}

type Chapter = {
  id: number
  chapter: string
  topics: Topic[]
}

type FormData = {
  chapterId: string
  title: string
  duration: string
  startDate: string
  endDate: string
  objectives: string[]
  content: string
  activities: string[]
  assessment: string
  resources: string[]
  difficulty: string
}

type EditingTopic = {
  chapterId: number
  topic: Topic
}

type TopicWithChapter = Topic & {
  chapterTitle: string
  chapterId: number
}

type FilterStatus = "all" | "completed" | "pending"
type FilterDifficulty = "all" | "easy" | "medium" | "hard"

// Mock data for math curriculum with more detailed information
const initialCurriculum: Chapter[] = [
  {
    id: 1,
    chapter: "1-р бүлэг: Тоонууд болон үйлдлүүд",
    topics: [
      {
        id: 11,
        title: "Натурал тооны үндэс ойлголт",
        duration: "2 цаг",
        startDate: "2024-09-01",
        endDate: "2024-09-05",
        objectives: ["Натурал тооны ойлголтыг ойлгох", "Тооны шугам дээр натурал тоог байрлуулах"],
        content: "Натурал тооны тодорхойлолт, шинж чанар, жишээнүүд",
        activities: ["Тооны шугам дээр ажиллах", "Бодлого бодох"],
        assessment: "Амаар асуулт, гэрийн даалгавар",
        resources: ["Математикийн ном хуудас 15-20", "Интерактив самбар"],
        difficulty: "Амархан",
        completed: true,
      },
      {
        id: 12,
        title: "Нэмэх, хасах үйлдлүүд",
        duration: "3 цаг",
        startDate: "2024-09-06",
        endDate: "2024-09-12",
        objectives: ["Нэмэх үйлдлийн шинж чанарыг ойлгох", "Хасах үйлдлийн алгоритмыг эзэмших"],
        content: "Нэмэх хасах үйлдлийн дүрэм, алгоритм",
        activities: ["Практик бодлого", "Бүлгийн ажил"],
        assessment: "Бичгийн шалгалт, сорил",
        resources: ["Дэвтэр", "Тооллын материал"],
        difficulty: "Дунд",
        completed: false,
      },
    ],
  },
  {
    id: 2,
    chapter: "2-р бүлэг: Геометрийн үндэс",
    topics: [
      {
        id: 21,
        title: "Цэг, шулуун, гадаргуу",
        duration: "2 цаг",
        startDate: "2024-09-13",
        endDate: "2024-09-17",
        objectives: ["Геометрийн үндсэн ойлголтуудыг ойлгох"],
        content: "Цэг, шулуун, гадаргуугийн тодорхойлолт",
        activities: ["Зурах ажил", "Модель хийх"],
        assessment: "Зураг зурах даалгавар",
        resources: ["Захирагч", "Геометрийн хэрэгсэл"],
        difficulty: "Амархан",
        completed: false,
      },
    ],
  },
]

export default function MathCurriculumManager() {
  const [curriculum, setCurriculum] = useState<Chapter[]>(initialCurriculum)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [editingTopic, setEditingTopic] = useState<EditingTopic | null>(null)
  const [expandedChapters, setExpandedChapters] = useState<number[]>([1])
  const [viewMode, setViewMode] = useState<"card" | "table">("card")
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<"all" | "completed" | "pending">("all")
  const [filterDifficulty, setFilterDifficulty] = useState<"all" | "easy" | "medium" | "hard">("all")

  const [formData, setFormData] = useState<FormData>({
    chapterId: "",
    title: "",
    duration: "",
    startDate: "",
    endDate: "",
    objectives: [""],
    content: "",
    activities: [""],
    assessment: "",
    resources: [""],
    difficulty: "Дунд",
  })

  const toggleChapter = (chapterId: number) => {
    setExpandedChapters((prev) =>
      prev.includes(chapterId) ? prev.filter((id) => id !== chapterId) : [...prev, chapterId],
    )
  }

  const handleCreateTopic = () => {
    if (formData.title && formData.chapterId) {
      const newTopic: Topic = {
        id: Date.now(),
        title: formData.title,
        duration: formData.duration,
        startDate: formData.startDate,
        endDate: formData.endDate,
        objectives: formData.objectives.filter((obj) => obj.trim()),
        content: formData.content,
        activities: formData.activities.filter((act) => act.trim()),
        assessment: formData.assessment,
        resources: formData.resources.filter((res) => res.trim()),
        difficulty: formData.difficulty,
        completed: false,
      }

      setCurriculum((prev) =>
        prev.map((chapter) =>
          chapter.id === Number.parseInt(formData.chapterId)
            ? { ...chapter, topics: [...chapter.topics, newTopic] }
            : chapter,
        ),
      )

      resetForm()
      setShowCreateForm(false)
    }
  }

  const handleEditTopic = (chapterId: number, topic: Topic) => {
    setEditingTopic({ chapterId, topic })
    setFormData({
      chapterId: chapterId.toString(),
      title: topic.title,
      duration: topic.duration,
      startDate: topic.startDate || "",
      endDate: topic.endDate || "",
      objectives: topic.objectives.length ? topic.objectives : [""],
      content: topic.content,
      activities: topic.activities.length ? topic.activities : [""],
      assessment: topic.assessment,
      resources: topic.resources ? topic.resources : [""],
      difficulty: topic.difficulty || "Дунд",
    })
  }

  const handleUpdateTopic = () => {
    if (editingTopic) {
      const updatedTopic: Topic = {
        ...editingTopic.topic,
        title: formData.title,
        duration: formData.duration,
        startDate: formData.startDate,
        endDate: formData.endDate,
        objectives: formData.objectives.filter((obj) => obj.trim()),
        content: formData.content,
        activities: formData.activities.filter((act) => act.trim()),
        assessment: formData.assessment,
        resources: formData.resources.filter((res) => res.trim()),
        difficulty: formData.difficulty,
      }

      setCurriculum((prev) =>
        prev.map((chapter) =>
          chapter.id === editingTopic.chapterId
            ? {
                ...chapter,
                topics: chapter.topics.map((topic) => (topic.id === editingTopic.topic.id ? updatedTopic : topic)),
              }
            : chapter,
        ),
      )

      setEditingTopic(null)
      resetForm()
    }
  }

  const deleteTopic = (chapterId: number, topicId: number) => {
    if (confirm("Энэ сэдвийг устгахдаа итгэлтэй байна уу?")) {
      setCurriculum((prev) =>
        prev.map((chapter) =>
          chapter.id === chapterId
            ? {
                ...chapter,
                topics: chapter.topics.filter((topic) => topic.id !== topicId),
              }
            : chapter,
        ),
      )
    }
  }

  const toggleTopicCompletion = (chapterId: number, topicId: number) => {
    setCurriculum((prev) =>
      prev.map((chapter) =>
        chapter.id === chapterId
          ? {
              ...chapter,
              topics: chapter.topics.map((topic) =>
                topic.id === topicId ? { ...topic, completed: !topic.completed } : topic,
              ),
            }
          : chapter,
      ),
    )
  }

  const resetForm = () => {
    setFormData({
      chapterId: "",
      title: "",
      duration: "",
      startDate: "",
      endDate: "",
      objectives: [""],
      content: "",
      activities: [""],
      assessment: "",
      resources: [""],
      difficulty: "Дунд",
    })
  }

  const addField = (fieldName: "objectives" | "activities" | "resources") => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: [...prev[fieldName], ""],
    }))
  }

  const updateField = (fieldName: "objectives" | "activities" | "resources", index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: prev[fieldName].map((item, i) => (i === index ? value : item)),
    }))
  }

  const removeField = (fieldName: "objectives" | "activities" | "resources", index: number) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: prev[fieldName].filter((_, i) => i !== index),
    }))
  }

  // Get all topics with chapter info for table view
  const getAllTopics = () => {
    return curriculum.flatMap((chapter) =>
      chapter.topics.map((topic) => ({
        ...topic,
        chapterTitle: chapter.chapter,
        chapterId: chapter.id,
      })),
    )
  }

  // Filter topics based on search and filters
  const getFilteredTopics = () => {
    let topics = getAllTopics()

    if (searchTerm) {
      topics = topics.filter(
        (topic) =>
          topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          topic.chapterTitle.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (filterStatus !== "all") {
      topics = topics.filter((topic) => (filterStatus === "completed" ? topic.completed : !topic.completed))
    }

    if (filterDifficulty !== "all") {
      const difficultyMap = { easy: "Амархан", medium: "Дунд", hard: "Хэцүү" }
      topics = topics.filter((topic) => topic.difficulty === difficultyMap[filterDifficulty])
    }

    return topics
  }

  const getTotalTopics = () => curriculum.reduce((sum, chapter) => sum + chapter.topics.length, 0)
  const getCompletedTopics = () =>
    curriculum.reduce((sum, chapter) => sum + chapter.topics.filter((topic) => topic.completed).length, 0)

  const exportToCSV = () => {
    const topics = getAllTopics()
    const headers = [
      "Бүлэг",
      "Сэдэв",
      "Хугацаа",
      "Эхлэх огноо",
      "Дуусах огноо",
      "Хүндрэл",
      "Төлөв",
      "Агуулга",
      "Зорилго",
      "Үйл ажиллагаа",
      "Үнэлгээ",
      "Нөөц",
    ]

    const csvContent = [
      headers.join(","),
      ...topics.map((topic) =>
        [
          topic.chapterTitle,
          topic.title,
          topic.duration,
          topic.startDate || "",
          topic.endDate || "",
          topic.difficulty || "",
          topic.completed ? "Дууссан" : "Хүлээгдэж байна",
          topic.content,
          topic.objectives.join("; "),
          topic.activities.join("; "),
          topic.assessment,
          (topic.resources || []).join("; "),
        ]
          .map((field) => `"${field}"`)
          .join(","),
      ),
    ].join("\n")

    const blob = new Blob(["\ufeff" + csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    link.href = URL.createObjectURL(blob)
    link.download = `Математикийн_хөтөлбөр_${new Date().toISOString().split("T")[0]}.csv`
    link.click()
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Амархан":
        return "text-green-600 bg-green-100"
      case "Дунд":
        return "text-yellow-600 bg-yellow-100"
      case "Хэцүү":
        return "text-red-600 bg-red-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  // ... rest of the JSX remains the same ...
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <div className="absolute top-10 left-10 w-40 h-40 bg-blue-200/15 rounded-full animate-pulse"></div>
        <div className="absolute top-32 right-20 w-28 h-28 bg-indigo-200/15 rounded-full animate-bounce"></div>
        <div className="absolute bottom-40 left-32 w-20 h-20 bg-purple-200/15 rounded-full animate-ping"></div>
        <div className="absolute bottom-20 right-40 w-36 h-36 bg-pink-200/10 rounded-full animate-pulse"></div>
        <div className="absolute top-1/2 left-1/3 w-12 h-12 bg-cyan-200/20 rounded-full animate-bounce"></div>
      </div>

      <div className="pt-16 pb-10 px-4 md:px-10 flex flex-col gap-10 relative z-10">
        {/* Header */}
        <Card className="bg-white/70 backdrop-blur-md border-white/50 shadow-xl hover:shadow-2xl transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-slate-800 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-blue-600" />
              Математикийн хичээлийн жилийн хөтөлбөр
            </CardTitle>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          {/* Left Sidebar - Statistics and Controls */}
          <div className="lg:col-span-1 space-y-6">
            {/* Progress Card */}
            <Card className="bg-white/60 backdrop-blur-lg border-white/50 shadow-xl hover:shadow-2xl transition-all duration-500">
              <CardHeader className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-t-xl">
                <CardTitle className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Гүйцэтгэл
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-white/30 text-center">
                    <p className="text-2xl font-bold text-blue-600">
                      {getCompletedTopics()}/{getTotalTopics()}
                    </p>
                    <p className="text-sm text-slate-600">Сэдэв дууссан</p>
                  </div>

                  <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-white/30 text-center">
                    <p className="text-2xl font-bold text-green-600">
                      {getTotalTopics() > 0 ? Math.round((getCompletedTopics() / getTotalTopics()) * 100) : 0}%
                    </p>
                    <p className="text-sm text-slate-600">Хөтөлбөр биелэсэн</p>
                  </div>

                  <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-white/30 text-center">
                    <p className="text-2xl font-bold text-purple-600">{curriculum.length}</p>
                    <p className="text-sm text-slate-600">Нийт бүлэг</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* View Controls */}
            <Card className="bg-white/60 backdrop-blur-lg border-white/50 shadow-xl">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-slate-800">Харах хэлбэр</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-3">
                <div className="flex gap-2">
                  <Button
                    onClick={() => setViewMode("card")}
                    className={`flex-1 ${viewMode === "card" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"} hover:bg-blue-600 transition-all duration-300 flex items-center justify-center gap-2`}
                  >
                    <List className="w-4 h-4" />
                    Карт
                  </Button>
                  <Button
                    onClick={() => setViewMode("table")}
                    className={`flex-1 ${viewMode === "table" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"} hover:bg-blue-600 transition-all duration-300 flex items-center justify-center gap-2`}
                  >
                    <Table className="w-4 h-4" />
                    Хүснэгт
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Search and Filters */}
            <Card className="bg-white/60 backdrop-blur-lg border-white/50 shadow-xl">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  Хайх & Шүүх
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Сэдэв хайх..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-white/30 bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700 mb-2 block">Төлөв:</label>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value as FilterStatus)}
                    className="w-full p-2 rounded-lg border border-white/30 bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">Бүгд</option>
                    <option value="completed">Дууссан</option>
                    <option value="pending">Хүлээгдэж байна</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700 mb-2 block">Хүндрэл:</label>
                  <select
                    value={filterDifficulty}
                    onChange={(e) => setFilterDifficulty(e.target.value as FilterDifficulty)}
                    className="w-full p-2 rounded-lg border border-white/30 bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">Бүгд</option>
                    <option value="easy">Амархан</option>
                    <option value="medium">Дунд</option>
                    <option value="hard">Хэцүү</option>
                  </select>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <Card className="bg-white/60 backdrop-blur-lg border-white/50 shadow-xl hover:shadow-2xl transition-all duration-500">
              <CardContent className="p-6 space-y-3">
                <Button
                  onClick={() => setShowCreateForm(!showCreateForm)}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Шинэ сэдэв нэмэх
                </Button>

                <Button
                  onClick={exportToCSV}
                  className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold py-3 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  Хөтөлбөр татах
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Create/Edit Form */}
            {(showCreateForm || editingTopic) && (
              <Card className="bg-white/60 backdrop-blur-lg border-white/50 shadow-xl">
                <CardHeader className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-t-xl">
                  <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-2">
                    {editingTopic ? <Edit className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                    {editingTopic ? "Сэдэв засах" : "Шинэ сэдэв нэмэх"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Бүлэг сонгох:</label>
                      <select
                        value={formData.chapterId}
                        onChange={(e) => setFormData({ ...formData, chapterId: e.target.value })}
                        className="w-full p-3 rounded-lg border border-white/30 bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                      >
                        <option value="">Бүлэг сонгоно уу</option>
                        {curriculum.map((chapter) => (
                          <option key={chapter.id} value={chapter.id}>
                            {chapter.chapter}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Хугацаа:</label>
                      <input
                        type="text"
                        value={formData.duration}
                        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                        className="w-full p-3 rounded-lg border border-white/30 bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="Жишээ: 2 цаг"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Эхлэх огноо:</label>
                      <input
                        type="date"
                        value={formData.startDate}
                        onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                        className="w-full p-3 rounded-lg border border-white/30 bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Дуусах огноо:</label>
                      <input
                        type="date"
                        value={formData.endDate}
                        onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                        className="w-full p-3 rounded-lg border border-white/30 bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Сэдвийн нэр:</label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full p-3 rounded-lg border border-white/30 bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="Сэдвийн нэрийг оруулна уу"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Хүндрэл:</label>
                      <select
                        value={formData.difficulty}
                        onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                        className="w-full p-3 rounded-lg border border-white/30 bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                      >
                        <option value="Амархан">Амархан</option>
                        <option value="Дунд">Дунд</option>
                        <option value="Хэцүү">Хэцүү</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Агуулга:</label>
                    <textarea
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      className="w-full p-3 rounded-lg border border-white/30 bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500 h-24 resize-none"
                      placeholder="Хичээлийн агуулга..."
                    />
                  </div>

                  {/* Dynamic fields for objectives, activities, resources */}
                  {(["objectives", "activities", "resources"] as const).map((fieldName) => (
                    <div key={fieldName} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-slate-700">
                          {fieldName === "objectives"
                            ? "Зорилго:"
                            : fieldName === "activities"
                              ? "Үйл ажиллагаа:"
                              : "Нөөц:"}
                        </label>
                        <Button
                          onClick={() => addField(fieldName)}
                          className="text-xs bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                        >
                          + Нэмэх
                        </Button>
                      </div>
                      {formData[fieldName].map((item, index) => (
                        <div key={index} className="flex gap-2">
                          <input
                            type="text"
                            value={item}
                            onChange={(e) => updateField(fieldName, index, e.target.value)}
                            className="flex-1 p-3 rounded-lg border border-white/30 bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder={`${
                              fieldName === "objectives"
                                ? "Зорилго"
                                : fieldName === "activities"
                                  ? "Үйл ажиллагаа"
                                  : "Нөөц"
                            } ${index + 1}`}
                          />
                          {formData[fieldName].length > 1 && (
                            <Button
                              onClick={() => removeField(fieldName, index)}
                              className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  ))}

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Үнэлгээ:</label>
                    <input
                      type="text"
                      value={formData.assessment}
                      onChange={(e) => setFormData({ ...formData, assessment: e.target.value })}
                      className="w-full p-3 rounded-lg border border-white/30 bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Үнэлгээний арга"
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button
                      onClick={editingTopic ? handleUpdateTopic : handleCreateTopic}
                      className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      {editingTopic ? "Засах" : "Хадгалах"}
                    </Button>
                    <Button
                      onClick={() => {
                        setShowCreateForm(false)
                        setEditingTopic(null)
                        resetForm()
                      }}
                      className="flex-1 bg-gradient-to-r from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <X className="w-4 h-4" />
                      Цуцлах
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Table View */}
            {viewMode === "table" && (
              <Card className="bg-white/60 backdrop-blur-lg border-white/50 shadow-xl">
                <CardHeader className="bg-gradient-to-r from-indigo-500/10 to-blue-500/10 rounded-t-xl">
                  <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-2">
                    <Table className="w-6 h-6" />
                    Хичээлийн хөтөлбөр - Хүснэгт харагдац
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-gradient-to-r from-blue-50 to-indigo-50">
                          <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-slate-700">№</th>
                          <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-slate-700">
                            Бүлэг
                          </th>
                          <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-slate-700">
                            Сэдэв
                          </th>
                          <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-slate-700">
                            Хугацаа
                          </th>
                          <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-slate-700">
                            Эхлэх
                          </th>
                          <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-slate-700">
                            Дуусах
                          </th>
                          <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-slate-700">
                            Хүндрэл
                          </th>
                          <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-slate-700">
                            Төлөв
                          </th>
                          <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-slate-700">
                            Үйлдэл
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {getFilteredTopics().length === 0 ? (
                          <tr>
                            <td colSpan={9} className="border border-gray-300 px-4 py-8 text-center text-slate-500">
                              Хайлтын үр дүн олдсонгүй
                            </td>
                          </tr>
                        ) : (
                          getFilteredTopics().map((topic, index) => (
                            <tr
                              key={topic.id}
                              className={`hover:bg-blue-50/50 transition-colors ${topic.completed ? "bg-green-50/30" : ""}`}
                            >
                              <td className="border border-gray-300 px-4 py-3 text-sm">{index + 1}</td>
                              <td className="border border-gray-300 px-4 py-3 text-sm font-medium">
                                {topic.chapterTitle}
                              </td>
                              <td className="border border-gray-300 px-4 py-3 text-sm">{topic.title}</td>
                              <td className="border border-gray-300 px-4 py-3 text-sm flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {topic.duration}
                              </td>
                              <td className="border border-gray-300 px-4 py-3 text-sm">
                                {topic.startDate ? new Date(topic.startDate).toLocaleDateString("mn-MN") : "-"}
                              </td>
                              <td className="border border-gray-300 px-4 py-3 text-sm">
                                {topic.endDate ? new Date(topic.endDate).toLocaleDateString("mn-MN") : "-"}
                              </td>
                              <td className="border border-gray-300 px-4 py-3 text-sm">
                                <span
                                  className={`px-2 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(topic.difficulty)}`}
                                >
                                  {topic.difficulty || "Дунд"}
                                </span>
                              </td>
                              <td className="border border-gray-300 px-4 py-3 text-sm">
                                <span
                                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                    topic.completed ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                                  }`}
                                >
                                  {topic.completed ? "Дууссан" : "Хүлээгдэж байна"}
                                </span>
                              </td>
                              <td className="border border-gray-300 px-4 py-3 text-sm">
                                <div className="flex gap-1">
                                  <Button
                                    onClick={() => toggleTopicCompletion(topic.chapterId, topic.id)}
                                    className={`px-2 py-1 text-xs rounded ${
                                      topic.completed
                                        ? "bg-yellow-500 hover:bg-yellow-600 text-white"
                                        : "bg-green-500 hover:bg-green-600 text-white"
                                    }`}
                                  >
                                    {topic.completed ? "Буцаах" : "Дуусгах"}
                                  </Button>
                                  <Button
                                    onClick={() => handleEditTopic(topic.chapterId, topic)}
                                    className="px-2 py-1 text-xs bg-blue-500 hover:bg-blue-600 text-white rounded"
                                  >
                                    <Edit className="w-3 h-3" />
                                  </Button>
                                  <Button
                                    onClick={() => deleteTopic(topic.chapterId, topic.id)}
                                    className="px-2 py-1 text-xs bg-red-500 hover:bg-red-600 text-white rounded"
                                  >
                                    <Trash2 className="w-3 h-3" />
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Card View */}
            {viewMode === "card" &&
              curriculum.map((chapter) => (
                <Card
                  key={chapter.id}
                  className="bg-white/60 backdrop-blur-lg border-white/50 shadow-xl hover:shadow-2xl transition-all duration-500"
                >
                  <CardHeader
                    className="bg-gradient-to-r from-indigo-500/10 to-blue-500/10 rounded-t-xl cursor-pointer"
                    onClick={() => toggleChapter(chapter.id)}
                  >
                    <CardTitle className="text-xl font-bold text-slate-800 flex items-center justify-between">
                      <span className="flex items-center gap-3">
                        <BookOpen className="w-6 h-6" />
                        {chapter.chapter}
                      </span>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-normal bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                          {chapter.topics.length} сэдэв
                        </span>
                        {expandedChapters.includes(chapter.id) ? (
                          <ChevronUp className="w-5 h-5" />
                        ) : (
                          <ChevronDown className="w-5 h-5" />
                        )}
                      </div>
                    </CardTitle>
                  </CardHeader>

                  {expandedChapters.includes(chapter.id) && (
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        {chapter.topics
                          .filter((topic) => {
                            if (searchTerm && !topic.title.toLowerCase().includes(searchTerm.toLowerCase()))
                              return false
                            if (
                              filterStatus !== "all" &&
                              ((filterStatus === "completed" && !topic.completed) ||
                                (filterStatus === "pending" && topic.completed))
                            )
                              return false
                            if (filterDifficulty !== "all") {
                              const difficultyMap = { easy: "Амархан", medium: "Дунд", hard: "Хэцүү" }
                              if (topic.difficulty !== difficultyMap[filterDifficulty]) return false
                            }
                            return true
                          })
                          .map((topic) => (
                            <div
                              key={topic.id}
                              className={`bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-white/30 transition-all duration-300 ${topic.completed ? "bg-green-50/50" : ""}`}
                            >
                              <div className="flex justify-between items-start mb-4">
                                <div className="flex-1">
                                  <div className="flex items-center gap-3 mb-2">
                                    <h3
                                      className={`text-lg font-bold ${topic.completed ? "text-green-800" : "text-slate-800"}`}
                                    >
                                      {topic.title}
                                    </h3>
                                    {topic.completed && (
                                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                                        Дууссан
                                      </span>
                                    )}
                                    <span
                                      className={`px-2 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(topic.difficulty)}`}
                                    >
                                      {topic.difficulty || "Дунд"}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-4 text-sm text-slate-600 mb-3">
                                    <div className="flex items-center gap-1">
                                      <Clock className="w-4 h-4" />
                                      {topic.duration}
                                    </div>
                                    {topic.startDate && (
                                      <div className="flex items-center gap-1">
                                        <Calendar className="w-4 h-4" />
                                        {new Date(topic.startDate).toLocaleDateString("mn-MN")} -{" "}
                                        {topic.endDate ? new Date(topic.endDate).toLocaleDateString("mn-MN") : ""}
                                      </div>
                                    )}
                                  </div>
                                </div>
                                <div className="flex gap-2">
                                  <Button
                                    onClick={() => toggleTopicCompletion(chapter.id, topic.id)}
                                    className={`px-3 py-1 text-xs rounded ${
                                      topic.completed
                                        ? "bg-yellow-500 hover:bg-yellow-600 text-white"
                                        : "bg-green-500 hover:bg-green-600 text-white"
                                    }`}
                                  >
                                    {topic.completed ? "Буцаах" : "Дуусгах"}
                                  </Button>
                                  <Button
                                    onClick={() => handleEditTopic(chapter.id, topic)}
                                    className="px-3 py-1 text-xs bg-blue-500 hover:bg-blue-600 text-white rounded"
                                  >
                                    <Edit className="w-3 h-3" />
                                  </Button>
                                  <Button
                                    onClick={() => deleteTopic(chapter.id, topic.id)}
                                    className="px-3 py-1 text-xs bg-red-500 hover:bg-red-600 text-white rounded"
                                  >
                                    <Trash2 className="w-3 h-3" />
                                  </Button>
                                </div>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                <div>
                                  <p className="font-semibold text-slate-700 mb-2">Агуулга:</p>
                                  <p className="text-slate-600">{topic.content}</p>
                                </div>

                                <div>
                                  <p className="font-semibold text-slate-700 mb-2">Үнэлгээ:</p>
                                  <p className="text-slate-600">{topic.assessment}</p>
                                </div>

                                <div>
                                  <p className="font-semibold text-slate-700 mb-2">Зорилго:</p>
                                  <ul className="text-slate-600 space-y-1">
                                    {topic.objectives.map((obj, index) => (
                                      <li key={index} className="flex items-start gap-2">
                                        <Target className="w-3 h-3 mt-1 text-blue-600 flex-shrink-0" />
                                        {obj}
                                      </li>
                                    ))}
                                  </ul>
                                </div>

                                <div>
                                  <p className="font-semibold text-slate-700 mb-2">Үйл ажиллагаа:</p>
                                  <ul className="text-slate-600 space-y-1">
                                    {topic.activities.map((activity, index) => (
                                      <li key={index} className="flex items-start gap-2">
                                        <Users className="w-3 h-3 mt-1 text-green-600 flex-shrink-0" />
                                        {activity}
                                      </li>
                                    ))}
                                  </ul>
                                </div>

                                {topic.resources && topic.resources.length > 0 && (
                                  <div className="md:col-span-2">
                                    <p className="font-semibold text-slate-700 mb-2">Нөөц:</p>
                                    <ul className="text-slate-600 space-y-1">
                                      {topic.resources.map((resource, index) => (
                                        <li key={index} className="flex items-start gap-2">
                                          <FileText className="w-3 h-3 mt-1 text-purple-600 flex-shrink-0" />
                                          {resource}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}

                        {chapter.topics.length === 0 && (
                          <div className="text-center py-8">
                            <BookOpen className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                            <p className="text-slate-500">Энэ бүлэгт сэдэв байхгүй байна</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  )}
                </Card>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
