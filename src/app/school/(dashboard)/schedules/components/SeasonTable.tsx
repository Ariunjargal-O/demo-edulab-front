"use client";
import { useState, useEffect } from "react";
import {
  Plus,
  Edit,
  Trash2,
  Calendar,
  Play,
  Pause,
  X,
  AlertTriangle,
  Loader2,
  RefreshCw,
  LogIn,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/auth-store";
import { BASE_URL } from "@/constants/baseurl";

import { useSeasonStore } from "@/stores/season-store";
import { AddSeasonDialog } from "./AddSeasonDailog";

interface Season {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  createdAt: string;
}

interface Message {
  type: "success" | "error";
  text: string;
}

interface ConfirmDialog {
  isOpen: boolean;
  type: "activate" | "deactivate" | "delete";
  season: Season | null;
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
}

const SeasonManagement = () => {
  const [seasons, setSeasons] = useState<Season[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [authLoading, setAuthLoading] = useState(true); // New state for auth loading

  const [showModal, setShowModal] = useState(false);
  const [editingSeason, setEditingSeason] = useState<Season | null>(null);
  const [message, setMessage] = useState<Message | null>(null);
  const [confirmDialog, setConfirmDialog] = useState<ConfirmDialog>({
    isOpen: false,
    type: "activate",
    season: null,
    title: "",
    message: "",
    confirmText: "",
    cancelText: "Цуцлах",
  });

  const { schoolId, token, isAuthenticated } = useAuthStore();

  // Required props for AddSeasonDialog
  const [requiredProps] = useState({
    schoolSubjectId: "",
    day: "",
    startTime: "",
    endTime: "",
    gradeId: "",
    groupId: "",
    teacherId: "",
    lessonId: "",
  });

  const { setSeasons: setStoreSeasons, updateSeasonStatus, removeSeason } = useSeasonStore();

  // Check authentication status with a delay to allow store to initialize
  useEffect(() => {
    const checkAuth = async () => {
      // Give the auth store time to initialize
      await new Promise(resolve => setTimeout(resolve, 100));
      setAuthLoading(false);
    };
    
    checkAuth();
  }, []);

  const fetchSeasons = async (schoolId: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${BASE_URL}/seasons/${schoolId}/allSeason`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Нэвтрэх эрх дууссан байна. Дахин нэвтэрнэ үү.");
        }
        throw new Error(data.error || "Улирлуудыг ачааллахад алдаа гарлаа");
      }

      let seasonsData = [];

      if (Array.isArray(data)) {
        seasonsData = data;
      } else if (data.allseason && Array.isArray(data.allseason)) {
        seasonsData = data.allseason;
      } else if (data.seasons && Array.isArray(data.seasons)) {
        seasonsData = data.seasons;
      } else if (data.data && Array.isArray(data.data)) {
        seasonsData = data.data;
      }

      setSeasons(seasonsData);
      setStoreSeasons(seasonsData);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Улирлуудыг ачааллахад алдаа гарлаа"
      );
    } finally {
      setLoading(false);
    }
  };

  const deleteSeason = async (seasonId: string) => {
    try {
      setSubmitting(true);
      setError(null);

      const response = await fetch(
        `${BASE_URL}/seasons/${schoolId}/delete/${seasonId}/`,
        {
          method: "DELETE",
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Нэвтрэх эрх дууссан байна. Дахин нэвтэрнэ үү.");
        }
        throw new Error(data.error || "Улирал устгахад алдаа гарлаа");
      }

      setSeasons((prev) => prev.filter((season) => season.id !== seasonId));
      removeSeason(seasonId);

      return data;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Улирал устгахад алдаа гарлаа";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  const activateSeason = async (seasonId: string) => {
    try {
      setSubmitting(true);
      setError(null);

      const response = await fetch(
        `${BASE_URL}/seasons/${schoolId}/${seasonId}/activate`,
        {
          method: "PUT",
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Нэвтрэх эрх дууссан байна. Дахин нэвтэрнэ үү.");
        }
        throw new Error(data.error || "Улирал идэвхжүүлэхэд алдаа гарлаа");
      }

      setSeasons((prev) =>
        prev.map((season) => ({
          ...season,
          isActive: season.id === seasonId,
        }))
      );

      updateSeasonStatus(seasonId, true);

      return data;
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Улирал идэвхжүүлэхэд алдаа гарлаа";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  const deactivateSeason = async (seasonId: string) => {
    try {
      setSubmitting(true);
      setError(null);

      const response = await fetch(
        `${BASE_URL}/seasons/${schoolId}/${seasonId}/deactivate`,
        {
          method: "PUT",
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Нэвтрэх эрх дууссан байна. Дахин нэвтэрнэ үү.");
        }
        throw new Error(data.error || "Улирал зогсооход алдаа гарлаа");
      }

      setSeasons((prev) =>
        prev.map((season) =>
          season.id === seasonId ? { ...season, isActive: false } : season
        )
      );

      updateSeasonStatus(seasonId, false);

      return data;
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Улирал зогсооход алдаа гарлаа";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  // Fetch seasons when schoolId is available
  useEffect(() => {
    if (!authLoading && schoolId && token) {
      fetchSeasons(schoolId);
    }
  }, [schoolId, token, authLoading]);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const showMessage = (type: "success" | "error", text: string) => {
    setMessage({ type, text });
  };

  const resetForm = () => {
    setShowModal(false);
    setEditingSeason(null);
  };

  const handleEdit = (season: Season) => {
    setEditingSeason(season);
    setShowModal(true);
  };

  const handleDeleteClick = (season: Season) => {
    setConfirmDialog({
      isOpen: true,
      type: "delete",
      season,
      title: "Улирал устгах",
      message: `"${season.name}" улирлыг бүрмөсөн устгахдаа итгэлтэй байна уу? Энэ үйлдлийг буцаах боломжгүй.`,
      confirmText: "Устгах",
      cancelText: "Цуцлах",
    });
  };

  const handleToggleActiveClick = (season: Season) => {
    if (season.isActive) {
      setConfirmDialog({
        isOpen: true,
        type: "deactivate",
        season,
        title: "Улирал зогсоох",
        message: `"${season.name}" улирлыг зогсоохдоо итгэлтэй байна уу? Энэ нь одоогийн идэвхтэй улирлыг зогсоох болно.`,
        confirmText: "Зогсоох",
        cancelText: "Цуцлах",
      });
    } else {
      setConfirmDialog({
        isOpen: true,
        type: "activate",
        season,
        title: "Улирал идэвхжүүлэх",
        message: `"${season.name}" улирлыг идэвхжүүлэхдээ итгэлтэй байна уу? Энэ нь бусад идэвхтэй улирлуудыг автоматаар зогсоох болно.`,
        confirmText: "Идэвхжүүлэх",
        cancelText: "Цуцлах",
      });
    }
  };

  const confirmAction = async () => {
    const { type, season } = confirmDialog;

    if (!season) return;

    try {
      switch (type) {
        case "delete":
          await deleteSeason(season.id);
          showMessage("success", "Улирал амжилттай устгагдлаа");
          break;
        case "activate":
          await activateSeason(season.id);
          showMessage("success", "Улирал амжилттай идэвхжлээ");
          break;
        case "deactivate":
          await deactivateSeason(season.id);
          showMessage("success", "Улирал амжилттай зогсоогдлоо");
          break;
      }
    } catch (error) {
      showMessage(
        "error",
        error instanceof Error ? error.message : "Алдаа гарлаа"
      );
    } finally {
      setConfirmDialog((prev) => ({ ...prev, isOpen: false, season: null }));
    }
  };

  const handleRefresh = () => {
    if (schoolId && token) {
      fetchSeasons(schoolId);
    }
  };

  const handleLogin = () => {
    // Redirect to login page or trigger login modal
    window.location.href = '/login'; // Adjust this based on your routing
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("mn-MN");
  };

  useEffect(() => {
    if (error) {
      showMessage("error", error);
    }
  }, [error]);

  // Show loading while checking authentication
  if (authLoading) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="bg-white/60 backdrop-blur-md border border-white/50 rounded-2xl p-12 text-center shadow-lg">
          <Loader2 className="h-16 w-16 text-blue-500 mx-auto mb-4 animate-spin" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            Системд холбогдож байна...
          </h3>
          <p className="text-gray-500">Түр хүлээнэ үү</p>
        </div>
      </div>
    );
  }

  // Show authentication required message
  if (!authLoading && (!isAuthenticated() || !token)) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="bg-amber-100/80 backdrop-blur-lg border border-amber-200/50 rounded-2xl p-8 text-center">
          <LogIn className="h-16 w-16 text-amber-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-amber-700 mb-2">
            Нэвтрэх шаардлагатай
          </h3>
          <p className="text-amber-600 mb-6">
            Энэ хуудсыг үзэхийн тулд та нэвтэрсэн байх ёстой
          </p>
          <Button
            onClick={handleLogin}
            className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
          >
            <LogIn className="mr-2" size={20} />
            Нэвтрэх
          </Button>
        </div>
      </div>
    );
  }

  // Show school ID not found message (this should be rare now)
  if (!authLoading && isAuthenticated() && token && !schoolId) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="bg-red-100/80 backdrop-blur-lg border border-red-200/50 rounded-2xl p-8 text-center">
          <AlertTriangle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-red-700 mb-2">
            Сургуулийн мэдээлэл олдсонгүй
          </h3>
          <p className="text-red-600 mb-6">
            Таны профайлд сургуулийн мэдээлэл байхгүй байна. Системийн админтай холбогдоно уу.
          </p>
          <div className="flex gap-4 justify-center">
            <Button
              onClick={handleRefresh}
              variant="outline"
              className="border-red-300 text-red-600 hover:bg-red-50"
            >
              <RefreshCw className="mr-2" size={18} />
              Дахин оролдох
            </Button>
            <Button
              onClick={handleLogin}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              <LogIn className="mr-2" size={18} />
              Дахин нэвтрэх
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative ">
      {/* Message display */}
      {message && (
        <div className="fixed top-4 right-4 z-50">
          <div
            className={`p-4 rounded-xl backdrop-blur-lg border shadow-xl transition-all duration-300 ${
              message.type === "success"
                ? "bg-green-100/80 text-green-700 border-green-200/50"
                : "bg-red-100/80 text-red-700 border-red-200/50"
            }`}
          >
            <div className="flex items-center justify-between gap-3">
              <span>{message.text}</span>
              <button
                onClick={() => setMessage(null)}
                className="text-current opacity-70 hover:opacity-100"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      <div className=" mx-auto space-y-8 w-full">
        {/* Header Card */}
        <div className="bg-white/70 backdrop-blur-md border border-white/50 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl">
          <div className="p-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-4xl font-bold leading-tight text-slate-800 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent flex items-center gap-4">
                  <Calendar className="h-10 w-10 text-blue-600" />
                  Улирлын хугацааг тохируулах
                </h1>
                <p className="text-slate-600 mt-3 text-lg">
                  Хичээлийн жилийн улирлуудыг удирдах, төлөвлөх
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Button
                  onClick={handleRefresh}
                  disabled={loading}
                  variant="outline"
                  className="p-3 rounded-xl border-2 border-gray-300 hover:border-gray-400 transition-all duration-200"
                >
                  <RefreshCw
                    className={`h-5 w-5 ${loading ? "animate-spin" : ""}`}
                  />
                </Button>
                <Button
                  onClick={() => setShowModal(true)}
                  disabled={loading || submitting}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
                >
                  <Plus size={22} />
                  Шинэ улирал нэмэх
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="bg-white/60 backdrop-blur-md border border-white/50 rounded-2xl p-12 text-center shadow-lg">
            <Loader2 className="h-16 w-16 text-blue-500 mx-auto mb-4 animate-spin" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              Улирлуудыг ачааллаж байна...
            </h3>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="bg-red-100/80 backdrop-blur-lg border border-red-200/50 rounded-2xl p-8 text-center">
            <AlertTriangle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-red-700 mb-2">
              Алдаа гарлаа
            </h3>
            <p className="text-red-600 mb-4">{error}</p>
            <Button
              onClick={handleRefresh}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              Дахин оролдох
            </Button>
          </div>
        )}

        {/* Seasons Grid */}
        {!loading && !error && (
          <>
            {seasons.length === 0 ? (
              <div className="bg-white/60 backdrop-blur-md border border-white/50 rounded-2xl p-12 text-center shadow-lg">
                <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  Улирал байхгүй байна
                </h3>
                <p className="text-gray-500">
                  Эхний улирлаа нэмэхийн тулд дээрх товчийг дарна уу
                </p>
              </div>
            ) : (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {seasons.map((season) => (
                  <div
                    key={season.id}
                    className="bg-white/70 backdrop-blur-md border border-white/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100/50 rounded-lg">
                          <Calendar className="text-blue-600" size={22} />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 text-lg leading-tight">
                            {season.name}
                          </h3>
                          <span className="text-sm text-gray-500">
                            {formatDate(season.createdAt)} үүсгэсэн
                          </span>
                        </div>
                      </div>
                      {season.isActive && (
                        <span className="bg-gradient-to-r from-green-400 to-emerald-500 text-white text-xs px-3 py-1 rounded-full shadow-md animate-pulse">
                          Идэвхтэй
                        </span>
                      )}
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center justify-between p-3 bg-gray-50/50 rounded-lg">
                        <span className="font-medium text-gray-700">
                          Эхлэх:
                        </span>
                        <span className="text-gray-900 font-semibold">
                          {formatDate(season.startDate)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50/50 rounded-lg">
                        <span className="font-medium text-gray-700">
                          Дуусах:
                        </span>
                        <span className="text-gray-900 font-semibold">
                          {formatDate(season.endDate)}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleToggleActiveClick(season)}
                        disabled={submitting}
                        className={`px-4 py-2 rounded-xl flex-1 flex items-center justify-center gap-2 text-sm font-semibold transition-all duration-300 disabled:opacity-50 ${
                          season.isActive
                            ? "bg-gradient-to-r from-orange-400 to-red-500 text-white hover:from-orange-500 hover:to-red-600 shadow-md"
                            : "bg-gradient-to-r from-green-400 to-emerald-500 text-white hover:from-green-500 hover:to-emerald-600 shadow-md"
                        }`}
                      >
                        {submitting ? (
                          <Loader2 className="animate-spin" size={16} />
                        ) : season.isActive ? (
                          <Pause size={16} />
                        ) : (
                          <Play size={16} />
                        )}
                        {season.isActive ? "Зогсоох" : "Идэвхжүүлэх"}
                      </button>

                      <button
                        onClick={() => handleEdit(season)}
                        disabled={submitting}
                        className="p-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50/70 rounded-xl transition-all duration-300 disabled:opacity-50"
                      >
                        <Edit size={18} />
                      </button>

                      <button
                        onClick={() => handleDeleteClick(season)}
                        disabled={submitting}
                        className="p-3 text-gray-600 hover:text-red-600 hover:bg-red-50/70 rounded-xl transition-all duration-300 disabled:opacity-50"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Add/Edit Season Dialog */}
      {schoolId && (
        <AddSeasonDialog
          isOpen={showModal}
          editingSeason={editingSeason}
          onCancel={resetForm}
          schoolId={schoolId}
          onSuccess={() => {
            fetchSeasons(schoolId);
            resetForm();
          }}
          schoolSubjectId={requiredProps.schoolSubjectId}
          day={requiredProps.day}
          startTime={requiredProps.startTime}
          endTime={requiredProps.endTime}
          gradeId={requiredProps.gradeId}
          groupId={requiredProps.groupId}
          teacherId={requiredProps.teacherId}
          lessonId={requiredProps.lessonId}
        />
      )}

      {/* Confirmation Dialog */}
      {confirmDialog.isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white/95 backdrop-blur-md rounded-2xl p-8 w-full max-w-md shadow-2xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-amber-100 rounded-full">
                <AlertTriangle className="h-6 w-6 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                {confirmDialog.title}
              </h3>
            </div>

            <p className="text-gray-600 mb-8 leading-relaxed">
              {confirmDialog.message}
            </p>

            <div className="flex gap-4">
              <button
                onClick={() =>
                  setConfirmDialog((prev) => ({ ...prev, isOpen: false }))
                }
                className="flex-1 px-6 py-3 text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 font-semibold transition-all duration-300"
              >
                {confirmDialog.cancelText}
              </button>
              <button
                onClick={confirmAction}
                className={`flex-1 px-6 py-3 text-white rounded-xl font-semibold shadow-lg transition-all duration-300 ${
                  confirmDialog.type === "delete"
                    ? "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
                    : confirmDialog.type === "deactivate"
                    ? "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                    : "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                }`}
              >
                {confirmDialog.confirmText}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SeasonManagement;