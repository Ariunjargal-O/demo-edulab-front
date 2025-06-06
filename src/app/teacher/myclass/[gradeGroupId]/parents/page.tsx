'use client'
import React from 'react';
import { useState, useEffect } from 'react';
import { Users, Mail, Phone, Calendar, Edit, Trash2, Plus, Search, Home, Briefcase, User, UserCheck } from 'lucide-react';

type Parent = {
  id: number;
  parentName: string;
  studentName: string;
  phone: string;
  email: string;
  address: string;
  profession: string;
  status: 'active' | 'inactive';
  createdAt: string;
};

type AnimatedCardProps = {
  children: React.ReactNode;
  delay?: number;
};

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

type CardHeaderProps = {
  children: React.ReactNode;
  className?: string;
};

type CardContentProps = {
  children: React.ReactNode;
  className?: string;
};

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'default' | 'outline' | 'destructive' | 'secondary';
  size?: 'default' | 'sm' | 'lg';
  className?: string;
  title?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
};

type TableProps = {
  children: React.ReactNode;
};

type TableHeaderProps = {
  children: React.ReactNode;
};

type TableBodyProps = {
  children: React.ReactNode;
};

type TableRowProps = {
  children: React.ReactNode;
  className?: string;
};

type TableHeadProps = {
  children: React.ReactNode;
  className?: string;
};

type TableCellProps = {
  children: React.ReactNode;
  className?: string;
};

type InputProps = {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  className?: string;
  required?: boolean;
};

type SelectProps = {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  children: React.ReactNode;
  className?: string;
};

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
};

const AnimatedCard = ({ children, delay = 0 }: AnimatedCardProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={`transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      {children}
    </div>
  );
};

const Card = ({ children, className = '' }: CardProps) => (
  <div className={`rounded-xl ${className}`}>{children}</div>
);

const CardHeader = ({ children, className = '' }: CardHeaderProps) => (
  <div className={className}>{children}</div>
);

const CardContent = ({ children, className = '' }: CardContentProps) => (
  <div className={className}>{children}</div>
);

const Button = ({ 
  children, 
  onClick, 
  variant = 'default', 
  size = 'default', 
  className = '', 
  title = '', 
  disabled = false,
  type = 'button'
}: ButtonProps) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variants = {
    default: 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl',
    outline: 'border border-gray-300 bg-white hover:bg-gray-50 text-gray-700',
    destructive: 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white',
    secondary: 'bg-gray-100 hover:bg-gray-200 text-gray-900'
  };
  
  const sizes = {
    default: 'px-4 py-2 text-sm',
    sm: 'px-3 py-1.5 text-xs',
    lg: 'px-6 py-3 text-base'
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      type={type}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {children}
    </button>
  );
};

const Table = ({ children }: TableProps) => (
  <div className="overflow-x-auto">
    <table className="min-w-full">{children}</table>
  </div>
);

const TableHeader = ({ children }: TableHeaderProps) => (
  <thead className="bg-slate-50/50 border-b border-slate-200">{children}</thead>
);

const TableBody = ({ children }: TableBodyProps) => <tbody>{children}</tbody>;

const TableRow = ({ children, className = '' }: TableRowProps) => (
  <tr className={`border-b border-slate-100 table-row-hover ${className}`}>{children}</tr>
);

const TableHead = ({ children, className = '' }: TableHeadProps) => (
  <th className={`px-6 py-4 text-left text-sm font-semibold text-slate-700 ${className}`}>
    {children}
  </th>
);

const TableCell = ({ children, className = '' }: TableCellProps) => (
  <td className={`px-6 py-4 text-sm ${className}`}>{children}</td>
);

const Input = ({ placeholder, value, onChange, type = 'text', className = '', required }: InputProps) => (
  <input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    required={required}
    className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all ${className}`}
  />
);

const Select = ({ value, onChange, children, className = '' }: SelectProps) => (
  <select
    value={value}
    onChange={onChange}
    className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all ${className}`}
  >
    {children}
  </select>
);

const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 modal-backdrop flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto modal-slide-in">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

const ParentsInfo = () => {
  const [parents, setParents] = useState<Parent[]>([
    {
      id: 1,
      parentName: "Батбаяр",
      studentName: "Б.Ганбаяр",
      phone: "99112233",
      email: "batbayar@gmail.com",
      address: "СХД, 3-р хороо",
      profession: "Багш",
      status: "active",
      createdAt: "2024-01-15"
    },
    {
      id: 2,
      parentName: "Оюунчимэг",
      studentName: "О.Мөнхбаяр",
      phone: "95445566",
      email: "oyunchimeg@mail.mn",
      address: "БЗД, 12-р хороо",
      profession: "Эмч",
      status: "active",
      createdAt: "2024-01-20"
    },
    {
      id: 3,
      parentName: "Энхбаяр",
      studentName: "Э.Баттөгс",
      phone: "88776655",
      email: "enkhbayar@yahoo.com",
      address: "ХУД, 8-р хороо",
      profession: "Инженер",
      status: "active",
      createdAt: "2024-02-01"
    },
    {
      id: 4,
      parentName: "Цэцэгмаа",
      studentName: "Ц.Ариунаа",
      phone: "99887744",
      email: "tsetsegmaa@gmail.com",
      address: "ЧД, 15-р хороо",
      profession: "Эдийн засагч",
      status: "inactive",
      createdAt: "2024-02-10"
    },
    {
      id: 5,
      parentName: "Болдбаяр",
      studentName: "Б.Мөнхжин",
      phone: "94334455",
      email: "boldbayar@mail.mn",
      address: "СБД, 20-р хороо",
      profession: "Жолооч",
      status: "active",
      createdAt: "2024-02-15"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingParent, setEditingParent] = useState<Parent | null>(null);
  const [deletingParent, setDeletingParent] = useState<Parent | null>(null);
  const [formData, setFormData] = useState<Omit<Parent, 'id' | 'createdAt'>>({
    parentName: '',
    studentName: '',
    phone: '',
    email: '',
    address: '',
    profession: '',
    status: 'active'
  });

  const filteredParents = parents.filter(parent => 
    parent.parentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    parent.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    parent.phone.includes(searchTerm) ||
    parent.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAdd = () => {
    setIsAddModalOpen(true);
    setFormData({
      parentName: '',
      studentName: '',
      phone: '',
      email: '',
      address: '',
      profession: '',
      status: 'active'
    });
  };

  const handleEdit = (parent: Parent) => {
    setEditingParent(parent);
    setFormData(parent);
    setIsEditModalOpen(true);
  };

  const handleDelete = (parent: Parent) => {
    setDeletingParent(parent);
    setIsDeleteModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingParent) {
      setParents(parents.map(p => 
        p.id === editingParent.id 
          ? { ...p, ...formData }
          : p
      ));
      setIsEditModalOpen(false);
      setEditingParent(null);
    } else {
      const newParent: Parent = {
        id: Math.max(...parents.map(p => p.id)) + 1,
        ...formData,
        createdAt: new Date().toISOString().split('T')[0]
      };
      setParents([...parents, newParent]);
      setIsAddModalOpen(false);
    }
    
    setFormData({
      parentName: '',
      studentName: '',
      phone: '',
      email: '',
      address: '',
      profession: '',
      status: 'active'
    });
  };

  const confirmDelete = () => {
    if (deletingParent) {
      setParents(parents.filter(p => p.id !== deletingParent.id));
      setIsDeleteModalOpen(false);
      setDeletingParent(null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('mn-MN');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden pt-30">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-200/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-32 right-32 w-24 h-24 bg-indigo-200/20 rounded-full animate-bounce"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-purple-200/20 rounded-full animate-ping"></div>
        <div className="absolute top-1/4 right-1/3 w-20 h-20 bg-emerald-200/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/3 left-1/3 w-12 h-12 bg-amber-200/20 rounded-full animate-bounce"></div>
      </div>

      <div className="pt-8 px-4 md:px-10 pb-10 relative z-10">
        {/* Header Section */}
        <AnimatedCard>
          <Card className="bg-gradient-to-r from-slate-100 via-blue-50 to-indigo-100 border border-white/60 shadow-lg mb-8">
            <CardHeader className="p-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-br from-blue-500/70 to-indigo-500/80 rounded-xl backdrop-blur-sm shadow-md">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-3xl md:text-4xl font-bold mb-2 text-slate-800">
                      Сурагчдын эцэг эхийн жагсаалт
                    </h1>
                    <p className="text-slate-600 text-lg">
                      Сурагчдын эцэг эхчүүдийн бүрэн мэдээлэл
                    </p>
                  </div>
                </div>
                <div className="shrink-0">
                  <Button onClick={handleAdd} className="flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Эцэг эх нэмэх
                  </Button>
                </div>
              </div>
            </CardHeader>
          </Card>
        </AnimatedCard>

        {/* Stats Cards */}
        <AnimatedCard delay={100}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-white/70 backdrop-blur-sm border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 font-medium">
                      Нийт эцэг эх
                    </p>
                    <p className="text-2xl font-bold text-slate-800">
                      {parents.length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur-sm border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl">
                    <UserCheck className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 font-medium">
                      Идэвхтэй
                    </p>
                    <p className="text-2xl font-bold text-slate-800">
                      {parents.filter(p => p.status === 'active').length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur-sm border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 font-medium">
                      И-мэйл бүхий
                    </p>
                    <p className="text-2xl font-bold text-slate-800">
                      {parents.filter(p => p.email).length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur-sm border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 font-medium">
                      Утас бүхий
                    </p>
                    <p className="text-2xl font-bold text-slate-800">
                      {parents.filter(p => p.phone).length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </AnimatedCard>

        {/* Search */}
        <AnimatedCard delay={150}>
          <div className="mb-6">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Нэр, утас, мэйлээр хайх..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </AnimatedCard>

        {/* Main Content */}
        <AnimatedCard delay={200}>
          <Card className="bg-white/70 backdrop-blur-sm border-white/50 shadow-xl">
            <CardContent className="p-8">
              {filteredParents.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Users className="w-10 h-10 text-slate-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-700 mb-2">
                    {searchTerm ? "Хайлтын үр дүн олдсонгүй" : "Одоогоор эцэг эх бүртгэгдээгүй байна"}
                  </h3>
                  <p className="text-slate-500 mb-6">
                    {searchTerm ? "Өөр түлхүүр үгээр хайж үзнэ үү." : "Анхны эцэг эхээ бүртгүүлэхээс эхлээрэй."}
                  </p>
                  {!searchTerm && (
                    <Button onClick={handleAdd} className="flex items-center gap-2">
                      <Plus className="w-4 h-4" />
                      Эцэг эх нэмэх
                    </Button>
                  )}
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow className="border-slate-200">
                      <TableHead className="w-[60px]">№</TableHead>
                      <TableHead>Эцэг эхийн нэр</TableHead>
                      <TableHead>Сурагчийн нэр</TableHead>
                      <TableHead>
                        <div className="flex items-center space-x-2">
                          <Phone className="w-4 h-4" />
                          <span>Утас</span>
                        </div>
                      </TableHead>
                      <TableHead>
                        <div className="flex items-center space-x-2">
                          <Mail className="w-4 h-4" />
                          <span>И-мэйл</span>
                        </div>
                      </TableHead>
                      <TableHead>
                        <div className="flex items-center space-x-2">
                          <Briefcase className="w-4 h-4" />
                          <span>Мэргэжил</span>
                        </div>
                      </TableHead>
                      <TableHead>Төлөв</TableHead>
                      <TableHead className="text-right">Үйлдэл</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredParents.map((parent, index) => (
                      <TableRow key={parent.id}>
                        <TableCell className="font-medium text-slate-600">
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                            {index + 1}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium text-slate-800">
                            {parent.parentName}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium text-slate-700">
                            {parent.studentName}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Phone className="w-4 h-4 text-slate-400" />
                            <span className="text-slate-600">
                              {parent.phone || "—"}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Mail className="w-4 h-4 text-slate-400" />
                            <span className="text-slate-600 truncate max-w-[200px]">
                              {parent.email || "—"}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Briefcase className="w-4 h-4 text-slate-400" />
                            <span className="text-slate-600">
                              {parent.profession || "—"}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            parent.status === 'active' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {parent.status === 'active' ? 'Идэвхтэй' : 'Идэвхгүй'}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEdit(parent)}
                              title="Засах"
                              className="border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDelete(parent)}
                              title="Устгах"
                              className="border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </AnimatedCard>
      </div>

      {/* Add/Edit Modal */}
      <Modal
        isOpen={isAddModalOpen || isEditModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setIsEditModalOpen(false);
          setEditingParent(null);
        }}
        title={editingParent ? "Эцэг эх засах" : "Эцэг эх нэмэх"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Эцэг эхийн нэр
              </label>
              <Input
                value={formData.parentName}
                onChange={(e) => setFormData({...formData, parentName: e.target.value})}
                placeholder="Эцэг эхийн нэр"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Сурагчийн нэр
              </label>
              <Input
                value={formData.studentName}
                onChange={(e) => setFormData({...formData, studentName: e.target.value})}
                placeholder="Сурагчийн нэр"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Утасны дугаар
              </label>
              <Input
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                placeholder="Утасны дугаар"
                type="tel"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                И-мэйл хаяг
              </label>
              <Input
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="И-мэйл хаяг"
                type="email"
                required
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Гэрийн хаяг
            </label>
            <Input
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
              placeholder="Гэрийн хаяг"
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Мэргэжил
              </label>
              <Input
                value={formData.profession}
                onChange={(e) => setFormData({...formData, profession: e.target.value})}
                placeholder="Мэргэжил"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Төлөв
              </label>
              <Select
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value as 'active' | 'inactive'})}
              >
                <option value="active">Идэвхтэй</option>
                <option value="inactive">Идэвхгүй</option>
              </Select>
            </div>
          </div>
          
          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setIsAddModalOpen(false);
                setIsEditModalOpen(false);
                setEditingParent(null);
              }}
            >
              Цуцлах
            </Button>
            <Button type="submit">
              {editingParent ? "Засах" : "Нэмэх"}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setDeletingParent(null);
        }}
        title="Эцэг эх устгах"
      >
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Trash2 className="w-8 h-8 text-red-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Эцэг эх устгах
          </h3>
          <p className="text-gray-600 mb-6">
            <strong>{deletingParent?.parentName}</strong>-ийн мэдээллийг бүрмөсөн устгахдаа итгэлтэй байна уу?
            <br />
            <span className="text-sm text-red-500">Энэ үйлдлийг буцаах боломжгүй.</span>
          </p>
          <div className="flex justify-center gap-3">
            <Button
              variant="secondary"
              onClick={() => {
                setIsDeleteModalOpen(false);
                setDeletingParent(null);
              }}
            >
              Цуцлах
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDelete}
            >
              Устгах
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ParentsInfo;