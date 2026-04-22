import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

// MUI Components
import { 
  Box, 
  Button, 
  Container, 
  Paper, 
  TextField, 
  Typography, 
  Divider,
  Alert 
} from "@mui/material";
import BusinessIcon from '@mui/icons-material/Business';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function CreateOrg() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return setError("Organization name is required");

    setLoading(true);
    try {
      await api.post("/organizations", { name });
      navigate("/organizations/list"); // Redirect to list usually better
    } catch (err) {
      setError(err.response?.data?.error || "Failed to create organization");
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5, mb: 5 }}>
  

      {/* Form Card */}
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

        <form onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 2, mb: 4 }}>
            <BusinessIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
            <TextField
              fullWidth
              label="Organization Name"
              variant="standard"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Acme Corp"
              disabled={loading}
              autoFocus
              helperText="This name will be used for billing and reports."
            />
          </Box>

          <Divider sx={{ my: 3 }} />

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button 
              variant="outlined" 
              onClick={() => navigate("/organizations/list")}
              disabled={loading}
            >
              Organasation List
            </Button>
            <Button 
              type="submit" 
              variant="contained" 
              size="large"
              startIcon={<SaveIcon />}
              disabled={loading}
              sx={{ px: 4 }}
            >
              {loading ? "Creating..." : "Create Organization"}
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
}

export default CreateOrg;