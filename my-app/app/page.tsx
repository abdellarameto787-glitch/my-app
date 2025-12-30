"use client";

import { useState, useRef } from 'react';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import ShareIcon from '@mui/icons-material/Share';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CakeIcon from '@mui/icons-material/Cake';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import SendIcon from '@mui/icons-material/Send';

export default function BirthdayPage() {
  const [name, setName] = useState('Fathi');
  const [age, setAge] = useState('');
  const [message, setMessage] = useState('');
  const [photos, setPhotos] = useState<string[]>([]);
  const [guestMessages, setGuestMessages] = useState<string[]>([]);
  const [guestName, setGuestName] = useState('');
  const [guestMessage, setGuestMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const emojis = ['🎂', '🎉', '🎁', '🎈', '✨', '💝', '🥳', '🎊', '🎀', '❤️', '🌟', '🌸'];

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPhotos(prev => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const addGuestMessage = () => {
    if (guestName && guestMessage) {
      const newMessage = `${guestName}: ${guestMessage}`;
      setGuestMessages(prev => [newMessage, ...prev.slice(0, 9)]);
      setGuestName('');
      setGuestMessage('');
    }
  };

  const addEmoji = (emoji: string) => {
    setMessage(prev => prev + emoji);
  };

  const sharePage = () => {
    if (navigator.share) {
      navigator.share({
        title: `Happy Birthday ${name}!`,
        text: `Send birthday wishes to ${name}!`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard! Share it with everyone! 🌍');
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box textAlign="center" mb={4}>
        <Button href="/" variant="outlined" sx={{ mb: 2 }}>
          ← Back to Home
        </Button>
        
        <Typography variant="h2" sx={{ color: '#e91e63', fontWeight: 'bold', mb: 1 }}>
          🎉 Worldwide Birthday Celebration 🎉
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Send love and wishes to {name} from anywhere in the world! 🌍
        </Typography>
        
        <Button
          variant="contained"
          startIcon={<ShareIcon />}
          onClick={sharePage}
          sx={{ mt: 2, bgcolor: '#4caf50' }}
        >
          Share This Page Globally
        </Button>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
        {/* Left Column - Inputs */}
        <Box sx={{ flex: 1 }}>
          <Paper sx={{ p: 3, mb: 3, borderRadius: 3 }}>
            <Typography variant="h5" gutterBottom color="primary">
              ✨ Personalize Your Wish
            </Typography>
            
            <TextField
              fullWidth
              label="🎀 Birthday Person's Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{ mb: 2 }}
              InputProps={{
                startAdornment: <FavoriteIcon sx={{ mr: 1, color: '#e91e63' }} />
              }}
            />
            
            <TextField
              fullWidth
              label="🎯 Age Turning"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              sx={{ mb: 2 }}
              InputProps={{
                startAdornment: <CakeIcon sx={{ mr: 1, color: '#ff9800' }} />
              }}
            />
            
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                💬 Your Birthday Message
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your heartfelt birthday message here..."
              />
            </Box>
            
            {/* Emoji Picker */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" gutterBottom>
                😊 Add Emojis
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {emojis.map((emoji, i) => (
                  <IconButton
                    key={i}
                    onClick={() => addEmoji(emoji)}
                    sx={{ fontSize: '1.5rem' }}
                  >
                    {emoji}
                  </IconButton>
                ))}
              </Box>
            </Box>
            
            {/* Photo Upload */}
            <Box sx={{ mb: 3 }}>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handlePhotoUpload}
                ref={fileInputRef}
                style={{ display: 'none' }}
              />
              <Button
                fullWidth
                variant="outlined"
                startIcon={<PhotoCamera />}
                onClick={() => fileInputRef.current?.click()}
              >
                📸 Upload Birthday Photos
              </Button>
            </Box>
          </Paper>
          
          {/* Guest Book */}
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h5" gutterBottom color="primary">
              📝 Global Guest Book
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              People from around the world can leave messages here!
            </Typography>
            
            <TextField
              fullWidth
              label="Your Name"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              sx={{ mb: 2 }}
            />
            
            <TextField
              fullWidth
              label="Your Message"
              multiline
              rows={2}
              value={guestMessage}
              onChange={(e) => setGuestMessage(e.target.value)}
              sx={{ mb: 2 }}
              placeholder="Leave a birthday message..."
            />
            
            <Button
              fullWidth
              variant="contained"
              endIcon={<SendIcon />}
              onClick={addGuestMessage}
              disabled={!guestName || !guestMessage}
            >
              Add to Global Guest Book
            </Button>
            
            {/* Display Guest Messages */}
            <Box sx={{ mt: 3, maxHeight: '200px', overflowY: 'auto' }}>
              {guestMessages.map((msg, i) => (
                <Paper key={i} sx={{ p: 2, mb: 1, bgcolor: '#f5f5f5' }}>
                  <Typography variant="body2">{msg}</Typography>
                </Paper>
              ))}
            </Box>
          </Paper>
        </Box>

        {/* Right Column - Display */}
        <Box sx={{ flex: 1 }}>
          {/* Birthday Card */}
          <Card sx={{ mb: 3, borderRadius: 3, bgcolor: '#fff3e0' }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h3" align="center" color="#d50000" gutterBottom>
                🎂 Happy {age ? `${age}th ` : ''}Birthday {name}! 🎉
              </Typography>
              
              <Typography variant="h6" align="center" sx={{ fontStyle: 'italic', mb: 3, py: 2, px: 3, bgcolor: 'white', borderRadius: 2 }}>
                {message || `Dearest ${name}, may Allah bless you with endless happiness, success, and keep you safe always. You are our little angel! 🌟`}
              </Typography>
              
              {/* Display Uploaded Photos */}
              {photos.length > 0 && (
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    📸 Birthday Photos
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {photos.slice(0, 4).map((photo, i) => (
                      <Box key={i} sx={{ width: '48%' }}>
                        <img
                          src={photo}
                          alt={`Birthday ${i + 1}`}
                          style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '10px' }}
                        />
                      </Box>
                    ))}
                  </Box>
                </Box>
              )}
              
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap', mt: 3 }}>
                {emojis.slice(0, 8).map((emoji, i) => (
                  <IconButton key={i} sx={{ fontSize: '2rem' }}>
                    {emoji}
                  </IconButton>
                ))}
              </Box>
            </CardContent>
          </Card>
          
          {/* World Map Info */}
          <Paper sx={{ p: 3, borderRadius: 3, bgcolor: '#e3f2fd' }}>
            <Typography variant="h5" gutterBottom color="#1976d2">
              🌍 Accessible Worldwide
            </Typography>
            <Typography variant="body1" paragraph>
              This birthday page can be accessed by anyone, anywhere:
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}>
              {['🇺🇸 USA', '🇬🇧 UK', '🇪🇺 Europe', '🇦🇪 UAE', '🇸🇦 KSA', '🇪🇹 Ethiopia', '🇨🇦 Canada', '🇦🇺 Australia', '🇯🇵 Japan'].map((country, i) => (
                <Paper key={i} sx={{ p: 1.5, borderRadius: 2, bgcolor: 'white' }}>
                  <Typography variant="body2">{country}</Typography>
                </Paper>
              ))}
            </Box>
            <Typography variant="body2" color="text.secondary">
              Share the link: <strong>{typeof window !== 'undefined' ? window.location.href : 'Your birthday page URL'}</strong>
            </Typography>
          </Paper>
        </Box>
      </Box>
    </Container>
  );
}