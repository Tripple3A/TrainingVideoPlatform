import React, { useState, useRef } from 'react';
import { Search, Upload, Play, Filter, Star, Clock, Eye, Plus, X, Check, Link, Copy, Settings } from 'lucide-react';

const VideoHelpPlatform = () => {
  // Get URL parameters to determine mode and filters
  const urlParams = new URLSearchParams(window.location.search);
  const adminMode = urlParams.get('admin') === 'true';
  const presetCategory = urlParams.get('category');
  const presetAudience = urlParams.get('audience');
  const presetSearch = urlParams.get('search');

  const [videos, setVideos] = useState([
    {
      id: 1,
      title: "How to Reset Your Password",
      category: "Account Management",
      audience: "Customers",
      duration: "2:34",
      views: 1247,
      rating: 4.8,
      thumbnail: "https://via.placeholder.com/300x200/4f46e5/ffffff?text=Password+Reset",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      description: "Step-by-step guide to reset your account password when you've forgotten it",
      tags: ["password", "account", "login", "security"]
    },
    {
      id: 2,
      title: "How to Place an Order",
      category: "Order Management",
      audience: "Customers",
      duration: "3:15",
      views: 892,
      rating: 4.6,
      thumbnail: "https://via.placeholder.com/300x200/059669/ffffff?text=Place+Order",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      description: "Complete walkthrough of placing your first order in the system",
      tags: ["order", "purchase", "checkout", "customers"]
    },
    {
      id: 3,
      title: "Conducting Property Inspections - Basics",
      category: "Inspection Process",
      audience: "Inspectors",
      duration: "5:22",
      views: 456,
      rating: 4.9,
      thumbnail: "https://via.placeholder.com/300x200/dc2626/ffffff?text=Inspection+Basics",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      description: "Essential steps for new inspectors to complete their first property inspection",
      tags: ["inspection", "property", "checklist", "inspectors", "beginner"]
    },
    {
      id: 4,
      title: "Advanced Inspection Techniques",
      category: "Inspection Process",
      audience: "Inspectors",
      duration: "7:18",
      views: 234,
      rating: 4.7,
      thumbnail: "https://via.placeholder.com/300x200/7c3aed/ffffff?text=Advanced+Inspection",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
      description: "Advanced techniques for experienced inspectors to improve accuracy and efficiency",
      tags: ["inspection", "advanced", "techniques", "inspectors", "professional"]
    },
    {
      id: 5,
      title: "Customer Service Best Practices",
      category: "Customer Support",
      audience: "All Users",
      duration: "4:45",
      views: 678,
      rating: 4.5,
      thumbnail: "https://via.placeholder.com/300x200/10b981/ffffff?text=Customer+Service",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
      description: "Best practices for providing excellent customer service and handling difficult situations",
      tags: ["customer service", "communication", "support", "best practices"]
    }
  ]);

  const [searchTerm, setSearchTerm] = useState(presetSearch || '');
  const [selectedCategory, setSelectedCategory] = useState(presetCategory || 'All');
  const [selectedAudience, setSelectedAudience] = useState(presetAudience || 'All');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showLinkGenerator, setShowLinkGenerator] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const fileInputRef = useRef(null);

  const categories = ['All', 'Getting Started', 'Account Management', 'Order Management', 'Inspection Process', 'Customer Support', 'Advanced Features'];
  const audiences = ['All', 'Customers', 'Inspectors', 'Admins'];

  const [newVideo, setNewVideo] = useState({
    title: '',
    category: 'Getting Started',
    audience: 'Customers',
    description: '',
    tags: '',
    file: null
  });

  const [linkConfig, setLinkConfig] = useState({
    category: 'All',
    audience: 'All',
    search: '',
    hideUpload: false
  });

  const filteredVideos = videos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         video.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || video.category === selectedCategory;
    const matchesAudience = selectedAudience === 'All' || video.audience === selectedAudience;
    return matchesSearch && matchesCategory && matchesAudience;
  });

  const handleUpload = () => {
    if (newVideo.title && newVideo.file) {
      const video = {
        id: videos.length + 1,
        title: newVideo.title,
        category: newVideo.category,
        audience: newVideo.audience,
        duration: "0:00",
        views: 0,
        rating: 0,
        thumbnail: "https://via.placeholder.com/300x200/6b7280/ffffff?text=New+Video",
        videoUrl: URL.createObjectURL(newVideo.file),
        description: newVideo.description,
        tags: newVideo.tags.split(',').map(tag => tag.trim())
      };
      setVideos([...videos, video]);
      setNewVideo({ title: '', category: 'Getting Started', audience: 'Customers', description: '', tags: '', file: null });
      setShowUploadModal(false);
    }
  };

  const generateCustomLink = () => {
    const baseUrl = window.location.origin + window.location.pathname;
    const params = new URLSearchParams();
    
    if (linkConfig.category !== 'All') params.set('category', linkConfig.category);
    if (linkConfig.audience !== 'All') params.set('audience', linkConfig.audience);
    if (linkConfig.search) params.set('search', linkConfig.search);
    if (linkConfig.hideUpload) params.set('hideUpload', 'true');
    
    return `${baseUrl}${params.toString() ? '?' + params.toString() : ''}`;
  };

  const copyLinkToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generateCustomLink());
      alert('Link copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const VideoPlayer = ({ video }) => (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold">{video.title}</h2>
          <button 
            onClick={() => setSelectedVideo(null)}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-4">
          <video 
            controls 
            className="w-full aspect-video rounded-lg bg-gray-900"
            poster={video.thumbnail}
          >
            <source src={video.videoUrl || "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="flex items-center gap-4 text-sm text-gray-600 mt-4 mb-4">
            <span className="flex items-center gap-1">
              <Eye size={16} />
              {video.views} views
            </span>
            <span className="flex items-center gap-1">
              <Star size={16} />
              {video.rating}/5
            </span>
            <span className="flex items-center gap-1">
              <Clock size={16} />
              {video.duration}
            </span>
          </div>
          <p className="text-gray-700 mb-4">{video.description}</p>
          <div className="flex flex-wrap gap-2">
            {video.tags.map((tag, index) => (
              <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const LinkGeneratorModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">Generate Custom Link</h2>
          <p className="text-sm text-gray-600 mt-1">Create a link with pre-filtered content for customers</p>
        </div>
        
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Pre-filter by Category</label>
            <select 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={linkConfig.category}
              onChange={(e) => setLinkConfig({...linkConfig, category: e.target.value})}
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Pre-filter by Audience</label>
            <select 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={linkConfig.audience}
              onChange={(e) => setLinkConfig({...linkConfig, audience: e.target.value})}
            >
              {audiences.map(audience => (
                <option key={audience} value={audience}>{audience}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Pre-fill Search Term</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={linkConfig.search}
              onChange={(e) => setLinkConfig({...linkConfig, search: e.target.value})}
              placeholder="e.g., password reset"
            />
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="hideUpload"
              className="mr-2"
              checked={linkConfig.hideUpload}
              onChange={(e) => setLinkConfig({...linkConfig, hideUpload: e.target.checked})}
            />
            <label htmlFor="hideUpload" className="text-sm text-gray-700">
              Hide upload button (customer-only view)
            </label>
          </div>
          
          <div className="bg-gray-50 p-3 rounded-lg">
            <label className="block text-sm font-medium text-gray-700 mb-2">Generated Link:</label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                className="flex-1 px-3 py-2 text-xs bg-white border border-gray-300 rounded"
                value={generateCustomLink()}
                readOnly
              />
              <button
                onClick={copyLinkToClipboard}
                className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-1"
              >
                <Copy size={14} />
                Copy
              </button>
            </div>
          </div>
        </div>
        
        <div className="p-6 border-t flex gap-3">
          <button 
            onClick={() => setShowLinkGenerator(false)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );

  // Show different header based on admin mode
  const showUploadButton = adminMode && !urlParams.get('hideUpload');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Help Center Videos</h1>
              {(presetCategory && presetCategory !== 'All') || (presetAudience && presetAudience !== 'All') ? (
                <p className="text-sm text-gray-600 mt-1">
                  Showing videos for: {presetCategory !== 'All' ? presetCategory : ''} 
                  {presetCategory !== 'All' && presetAudience !== 'All' ? ' - ' : ''}
                  {presetAudience !== 'All' ? presetAudience : ''}
                </p>
              ) : null}
            </div>
            <div className="flex items-center gap-3">
              {adminMode && (
                <button 
                  onClick={() => setShowLinkGenerator(true)}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
                >
                  <Link size={20} />
                  Generate Link
                </button>
              )}
              {showUploadButton && (
                <button 
                  onClick={() => setShowUploadModal(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
                >
                  <Plus size={20} />
                  Upload Video
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Admin Mode Notice */}
        {adminMode && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2">
              <Settings size={20} className="text-blue-600" />
              <div>
                <p className="text-blue-800 font-medium">Admin Mode Active</p>
                <p className="text-blue-600 text-sm">
                  You can upload videos and generate custom links for customers. 
                  <a href="?" className="underline ml-1">Switch to customer view</a>
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search videos by title or topic..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter size={20} className="text-gray-400" />
              <select 
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <select 
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selectedAudience}
                onChange={(e) => setSelectedAudience(e.target.value)}
              >
                {audiences.map(audience => (
                  <option key={audience} value={audience}>{audience}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Quick Access Categories */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg">
            <h3 className="font-semibold mb-2">For Customers</h3>
            <p className="text-blue-100 text-sm">Password reset, orders, accounts</p>
          </div>
          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-lg">
            <h3 className="font-semibold mb-2">For Inspectors</h3>
            <p className="text-green-100 text-sm">Inspection process & techniques</p>
          </div>
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-lg">
            <h3 className="font-semibold mb-2">Getting Started</h3>
            <p className="text-purple-100 text-sm">New user onboarding guides</p>
          </div>
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-lg">
            <h3 className="font-semibold mb-2">Advanced</h3>
            <p className="text-orange-100 text-sm">Expert tips and workflows</p>
          </div>
        </div>

        {/* Video Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map(video => (
            <div key={video.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div 
                className="relative cursor-pointer"
                onClick={() => setSelectedVideo(video)}
              >
                <img 
                  src={video.thumbnail} 
                  alt={video.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all flex items-center justify-center">
                  <Play className="text-white opacity-0 hover:opacity-100 transition-opacity" size={48} />
                </div>
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-xs">
                  {video.duration}
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium">
                      {video.category}
                    </span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                      {video.audience}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-yellow-500">
                    <Star size={14} fill="currentColor" />
                    <span className="text-xs text-gray-600">{video.rating}</span>
                  </div>
                </div>
                
                <h3 
                  className="font-semibold text-gray-900 mb-2 cursor-pointer hover:text-blue-600"
                  onClick={() => setSelectedVideo(video)}
                >
                  {video.title}
                </h3>
                
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {video.description}
                </p>
                
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Eye size={12} />
                    {video.views} views
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} />
                    {video.duration}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredVideos.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">No videos found matching your search.</p>
            {showUploadButton && (
              <button 
                onClick={() => setShowUploadModal(true)}
                className="text-blue-600 hover:text-blue-700"
              >
                Upload the first video for this topic
              </button>
            )}
          </div>
        )}
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold">Upload New Help Video</h2>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Video Title</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newVideo.title}
                  onChange={(e) => setNewVideo({...newVideo, title: e.target.value})}
                  placeholder="e.g., How to reset your password"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newVideo.category}
                  onChange={(e) => setNewVideo({...newVideo, category: e.target.value})}
                >
                  {categories.slice(1).map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Target Audience</label>
                <select 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newVideo.audience}
                  onChange={(e) => setNewVideo({...newVideo, audience: e.target.value})}
                >
                  {audiences.slice(1).map(audience => (
                    <option key={audience} value={audience}>{audience}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="3"
                  value={newVideo.description}
                  onChange={(e) => setNewVideo({...newVideo, description: e.target.value})}
                  placeholder="Brief description of what this video covers"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tags (comma-separated)</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newVideo.tags}
                  onChange={(e) => setNewVideo({...newVideo, tags: e.target.value})}
                  placeholder="password, account, login, security"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Video File</label>
                <div 
                  className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-400"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="mx-auto mb-2 text-gray-400" size={32} />
                  <p className="text-gray-600">Click to upload video file</p>
                  <p className="text-xs text-gray-500 mt-1">MP4, MOV, AVI (max 100MB)</p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="video/*"
                    className="hidden"
                    onChange={(e) => setNewVideo({...newVideo, file: e.target.files[0]})}
                  />
                  {newVideo.file && (
                    <p className="text-sm text-green-600 mt-2">✓ {newVideo.file.name}</p>
                  )}
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t flex gap-3">
              <button 
                onClick={() => setShowUploadModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                onClick={handleUpload}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
                disabled={!newVideo.title || !newVideo.file}
              >
                <Check size={16} />
                Upload Video
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Link Generator Modal */}
      {showLinkGenerator && <LinkGeneratorModal />}

      {/* Video Player Modal */}
      {selectedVideo && <VideoPlayer video={selectedVideo} />}
    </div>
  );
};

export default VideoHelpPlatform;