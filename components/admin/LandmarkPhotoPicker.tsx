'use client';

import { useState, useEffect, useCallback } from 'react';

interface Photo {
  photo_id: string;
  display_name: string;
  image_url: string;
}

interface LandmarkPhotoPickerProps {
  itineraryId: string;
  currentPhoto?: Photo | null;
  onChange?: (photo: Photo | null) => void;
}

export default function LandmarkPhotoPicker({
  itineraryId,
  currentPhoto,
  onChange
}: LandmarkPhotoPickerProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Photo[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadName, setUploadName] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  
  const [isLinking, setIsLinking] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [removeMessage, setRemoveMessage] = useState<string | null>(null);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery.trim()) {
        performSearch(searchQuery);
      } else {
        setSearchResults([]);
        setShowDropdown(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const performSearch = async (query: string) => {
    setIsSearching(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/admin/landmark-photos?q=${encodeURIComponent(query)}`);
      
      if (!response.ok) {
        throw new Error('Failed to search photos');
      }
      
      const data = await response.json();
      
      if (data.success && data.data) {
        const photos = data.data.map((item: any) => ({
          photo_id: item.id,
          display_name: item.name,
          image_url: item.image_url
        }));
        setSearchResults(photos);
        setShowDropdown(photos.length > 0);
      } else {
        setSearchResults([]);
        setShowDropdown(false);
      }
    } catch (err) {
      console.error('Search error:', err);
      setError('Failed to search photos');
      setSearchResults([]);
      setShowDropdown(false);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSelectPhoto = async (photo: Photo) => {
    setIsLinking(true);
    setError(null);
    setShowDropdown(false);
    setSearchQuery('');
    
    try {
      const response = await fetch(`/api/admin/itineraries/${itineraryId}/photo`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ photo_id: photo.photo_id }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to link photo');
      }
      
      const data = await response.json();
      
      if (data.success && data.data) {
        onChange?.(photo);
      } else {
        throw new Error('Failed to link photo');
      }
    } catch (err) {
      console.error('Link error:', err);
      setError('Failed to link photo to itinerary');
    } finally {
      setIsLinking(false);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!uploadFile || !uploadName.trim()) {
      setError('Please provide both a file and landmark name');
      return;
    }
    
    setIsUploading(true);
    setError(null);
    
    try {
      // Upload new photo
      const formData = new FormData();
      formData.append('file', uploadFile);
      formData.append('displayName', uploadName);
      formData.append('country', 'thailand'); // Default country
      
      const uploadResponse = await fetch('/api/admin/landmark-photos', {
        method: 'POST',
        body: formData,
      });
      
      if (!uploadResponse.ok) {
        throw new Error('Failed to upload photo');
      }
      
      const uploadData = await uploadResponse.json();
      
      if (!uploadData.success || !uploadData.data) {
        throw new Error('Failed to upload photo');
      }
      
      const newPhoto: Photo = {
        photo_id: uploadData.data.id,
        display_name: uploadData.data.name,
        image_url: uploadData.data.image_url
      };
      
      // Link to itinerary
      const linkResponse = await fetch(`/api/admin/itineraries/${itineraryId}/photo`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ photo_id: newPhoto.photo_id }),
      });
      
      if (!linkResponse.ok) {
        throw new Error('Failed to link photo');
      }
      
      const linkData = await linkResponse.json();
      
      if (linkData.success) {
        onChange?.(newPhoto);
        setUploadFile(null);
        setUploadName('');
      } else {
        throw new Error('Failed to link photo');
      }
    } catch (err) {
      console.error('Upload error:', err);
      setError('Failed to upload and link photo');
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = async () => {
    setIsRemoving(true);
    setError(null);
    setRemoveMessage(null);
    
    console.log('DEBUG handleRemove firing, itineraryId:', itineraryId, 'url:', `/api/admin/itineraries/${itineraryId}/photo`);
    
    try {
      const response = await fetch(`/api/admin/itineraries/${itineraryId}/photo`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to remove photo');
      }
      
      const data = await response.json();
      
      if (data.success) {
        onChange?.(null);
        
        // Show message if photo was kept in library
        if (data.unlinked && !data.deleted && data.reason === 'still used by another tour') {
          setRemoveMessage('Photo also used by another tour — kept in the library, only removed from this day.');
        }
      } else {
        throw new Error('Failed to remove photo');
      }
    } catch (err) {
      console.error('Remove error:', err);
      setError('Failed to remove photo from itinerary');
    } finally {
      setIsRemoving(false);
    }
  };

  return (
    <div className="space-y-3">
      {/* Current Photo Preview */}
      {currentPhoto && (
        <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border">
          <img
            src={currentPhoto.image_url}
            alt={currentPhoto.display_name}
            className="w-16 h-16 object-cover rounded"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {currentPhoto.display_name}
            </p>
            <button
              onClick={handleRemove}
              disabled={isRemoving}
              className="mt-1 text-xs text-red-600 hover:text-red-700 disabled:opacity-50"
            >
              {isRemoving ? 'Removing...' : 'Remove'}
            </button>
            {removeMessage && (
              <p className="mt-1 text-xs text-gray-500 italic">
                {removeMessage}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Search Library */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search photo library..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          disabled={isSearching || isLinking}
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
        />
        
        {showDropdown && searchResults.length > 0 && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
            {searchResults.map((photo) => (
              <button
                key={photo.photo_id}
                onClick={() => handleSelectPhoto(photo)}
                disabled={isLinking}
                className="w-full flex items-center gap-3 p-2 hover:bg-gray-50 border-b last:border-b-0 disabled:opacity-50"
              >
                <img
                  src={photo.image_url}
                  alt={photo.display_name}
                  className="w-10 h-10 object-cover rounded"
                />
                <span className="text-sm text-gray-700 truncate">
                  {photo.display_name}
                </span>
              </button>
            ))}
          </div>
        )}
        
        {isSearching && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>

      {/* Upload New Photo */}
      <div className="pt-2 border-t">
        <p className="text-xs font-medium text-gray-700 mb-2">Or upload new photo:</p>
        <form onSubmit={handleUpload} className="space-y-2">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setUploadFile(e.target.files?.[0] || null)}
            disabled={isUploading}
            className="w-full text-xs text-gray-600 file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 disabled:opacity-50"
          />
          <input
            type="text"
            placeholder="Landmark name"
            value={uploadName}
            onChange={(e) => setUploadName(e.target.value)}
            disabled={isUploading}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isUploading || !uploadFile || !uploadName.trim()}
            className="w-full px-3 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isUploading ? 'Uploading...' : 'Upload Photo'}
          </button>
        </form>
      </div>

      {/* Error Message */}
      {error && (
        <p className="text-xs text-red-600">{error}</p>
      )}
    </div>
  );
}