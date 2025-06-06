"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Send,
  MessageCircle,
  Users,
  Phone,
  Video,
  MoreVertical,
  Smile,
  Paperclip,
  Mic,
} from "lucide-react";
import React, { useState } from "react";
import { Header } from "../(dashboard)/components/Header";

export default function ChatSection() {
  const [selectedChat, setSelectedChat] = useState(0);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "Б.Болормаа",
      content: "Ангийн эцэг эхийн мэдээлэл асуух гээд",
      time: "14:30",
      isOwn: false,
      avatar: "👩‍🎓",
    },
    {
      id: 2,
      sender: "Та",
      content: "Мэдээжээ! Юу тухай вэ?",
      time: "14:32",
      isOwn: true,
      avatar: "👨‍🏫",
    },
    {
      id: 3,
      sender: "Б.Болормаа",
      content: "Үйл ажилгааны мэдээлэл байна уу",
      time: "14:33",
      isOwn: false,
      avatar: "👩‍🎓",
    },
    {
      id: 4,
      sender: "Та",
      content:
        "За, Харин ээ?",
      time: "14:35",
      isOwn: true,
      avatar: "👨‍🏫",
    },
  ]);

  const chatList = [
    {
      id: 0,
      name: "Б.Болормаа",
      lastMessage: "За, дэлгэрэнгүй тайлбарлая...",
      time: "14:35",
      unread: 2,
      avatar: "👩‍🎓",
      status: "online",
    },
    {
      id: 1,
      name: "Т.Төмөрбаатар",
      lastMessage: "Баярлалаа багш аа!",
      time: "13:22",
      unread: 0,
      avatar: "👨‍🎓",
      status: "offline",
    },
    {
      id: 2,
      name: "Д.Дулгуун",
      lastMessage: "Физикийн лабораторийн ажлын талаар",
      time: "12:45",
      unread: 1,
      avatar: "👩‍🔬",
      status: "away",
    },
    {
      id: 3,
      name: "М.Мөнхбаяр",
      lastMessage: "Маргааш уулзах уу?",
      time: "11:30",
      unread: 0,
      avatar: "👨‍💻",
      status: "online",
    },
    {
      id: 4,
      name: "С.Сарантуяа",
      lastMessage: "Англи хэлний бие даалт хийлээ",
      time: "10:15",
      unread: 3,
      avatar: "👩‍💼",
      status: "online",
    },
  ];

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const newMsg = {
        id: messages.length + 1,
        sender: "Та",
        content: newMessage,
        time: new Date().toLocaleTimeString("mn-MN", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        isOwn: true,
        avatar: "👨‍🏫",
      };
      setMessages([...messages, newMsg]);
      setNewMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <div className="absolute top-10 left-10 w-40 h-40 bg-blue-200/15 rounded-full animate-pulse"></div>
        <div className="absolute top-32 right-20 w-28 h-28 bg-indigo-200/15 rounded-full animate-bounce"></div>
        <div className="absolute bottom-40 left-32 w-20 h-20 bg-purple-200/15 rounded-full animate-ping"></div>
        <div className="absolute bottom-20 right-40 w-36 h-36 bg-pink-200/10 rounded-full animate-pulse"></div>
        <div className="absolute top-1/2 left-1/3 w-12 h-12 bg-cyan-200/20 rounded-full animate-bounce"></div>
        <div className="absolute top-1/4 right-1/3 w-24 h-24 bg-emerald-200/10 rounded-full animate-pulse"></div>
      </div>
      <Header />
      <div className="pb-10 px-4 md:px-10 relative z-10 pt-30">
        {/* Header Card */}

        <Card className="bg-white/70 backdrop-blur-md border-white/50 shadow-xl hover:shadow-2xl transition-all duration-300 mb-6">
          <CardHeader>
            <CardTitle className="text-3xl font-bold leading-8 text-slate-800 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text flex items-center gap-3">
              <MessageCircle className="h-8 w-8 text-blue-600" />
              Чат
            </CardTitle>
            {/* <p className="text-slate-600 mt-2">Шууд харилцаа болон зөвлөгөө өгөх</p> */}
          </CardHeader>
        </Card>

        {/* Main Chat Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 h-[700px]">
          {/* Chat List - Left Side */}
          <Card className="bg-white/70 backdrop-blur-md border-white/50 shadow-xl">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-600" />
                Чат ({chatList.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-1 max-h-[580px] overflow-y-auto">
                {chatList.map((chat) => (
                  <div
                    key={chat.id}
                    onClick={() => setSelectedChat(chat.id)}
                    className={`p-3 cursor-pointer transition-all duration-300 hover:bg-white/40 ${
                      selectedChat === chat.id
                        ? "bg-blue-100/50 border-r-4 border-blue-500"
                        : ""
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-sm">
                          {chat.avatar}
                        </div>
                        <div
                          className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                            chat.status === "online"
                              ? "bg-green-500"
                              : chat.status === "away"
                              ? "bg-yellow-500"
                              : "bg-gray-400"
                          }`}
                        ></div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-slate-800 truncate text-sm">
                            {chat.name}
                          </h3>
                          <span className="text-xs text-slate-500">
                            {chat.time}
                          </span>
                        </div>
                        <div className="flex items-center justify-between mt-1">
                          <p className="text-xs text-slate-600 truncate">
                            {chat.lastMessage}
                          </p>
                          {chat.unread > 0 && (
                            <span className="bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full min-w-[16px] text-center">
                              {chat.unread}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Chat Messages - Right Side */}
          <div className="lg:col-span-4">
            <Card className="bg-white/70 backdrop-blur-md border-white/50 shadow-xl h-full flex flex-col">
              {/* Chat Header */}
              <CardHeader className="pb-4 border-b border-white/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white">
                      {chatList[selectedChat]?.avatar}
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800">
                        {chatList[selectedChat]?.name}
                      </h3>
                      <p className="text-sm text-green-600">Идэвхтэй</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-white/40 rounded-full transition-all duration-300">
                      <Phone className="h-5 w-5 text-slate-600" />
                    </button>
                    <button className="p-2 hover:bg-white/40 rounded-full transition-all duration-300">
                      <Video className="h-5 w-5 text-slate-600" />
                    </button>
                    <button className="p-2 hover:bg-white/40 rounded-full transition-all duration-300">
                      <MoreVertical className="h-5 w-5 text-slate-600" />
                    </button>
                  </div>
                </div>
              </CardHeader>

              {/* Messages Area */}
              <CardContent className="flex-1 p-0 overflow-hidden">
                <div className="h-[480px] overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-3 ${
                        message.isOwn ? "justify-end" : "justify-start"
                      }`}
                    >
                      {!message.isOwn && (
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-sm flex-shrink-0">
                          {message.avatar}
                        </div>
                      )}
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl backdrop-blur-md shadow-md ${
                          message.isOwn
                            ? "bg-blue-500/80 text-white rounded-br-md"
                            : "bg-white/80 text-slate-800 rounded-bl-md"
                        }`}
                      >
                        <p className="text-sm leading-relaxed">
                          {message.content}
                        </p>
                        <p
                          className={`text-xs mt-2 ${
                            message.isOwn ? "text-blue-100" : "text-slate-500"
                          }`}
                        >
                          {message.time}
                        </p>
                      </div>
                      {message.isOwn && (
                        <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white text-sm flex-shrink-0">
                          {message.avatar}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>

              {/* Message Input */}
              <div className="p-4 border-t border-white/30">
                <div className="flex items-center gap-3">
                  <button className="p-2 hover:bg-white/40 rounded-full transition-all duration-300">
                    <Paperclip className="h-5 w-5 text-slate-600" />
                  </button>
                  <div className="flex-1 relative">
                    <textarea
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Мессеж бичнэ үү..."
                      className="w-full px-4 py-3 bg-white/60 backdrop-blur-md border border-white/50 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent text-slate-800 placeholder-slate-500"
                      rows={1}
                    />
                  </div>
                  <button className="p-2 hover:bg-white/40 rounded-full transition-all duration-300">
                    <Smile className="h-5 w-5 text-slate-600" />
                  </button>
                  <button className="p-2 hover:bg-white/40 rounded-full transition-all duration-300">
                    <Mic className="h-5 w-5 text-slate-600" />
                  </button>
                  <button
                    onClick={handleSendMessage}
                    className="p-3 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
      {/* Footer */}
      {/* <div className="text-center pt-8">
          <p className="text-slate-600 text-sm">
            Харилцааны систем | 
            <span className="text-blue-600 ml-1">Чат</span>
          </p>
        </div> */}
    </div>
  );
}
