{
  "description": "Schema de dados para análise preditiva e machine learning",
  "version": "1.0",
  "last_updated": "2024-12-06",
  
  "event_history_schema": {
    "event_id": "string (unique)",
    "date": "ISO 8601 date",
    "event_type": "enum: casamento|aniversario|corporativo|festa_privada|festival|reveillon|outro",
    "location": {
      "city": "string",
      "state": "string",
      "venue_type": "enum: casa_praia|resort|clube|praia|espaco_privado|outro",
      "specific_venue": "string (optional)"
    },
    "client_profile": {
      "age_range": "string (25-35, 35-45, 45-55, 55+)",
      "budget_range": "string (ate_5k|5k_10k|10k_20k|20k_50k|acima_50k)",
      "guest_count": "integer",
      "is_repeat_client": "boolean"
    },
    "event_details": {
      "duration_hours": "float",
      "start_time": "time (HH:MM)",
      "music_style": "array of strings",
      "atmosphere": "string",
      "special_requests": "array of strings"
    },
    "equipment_used": {
      "dj_gear": "array: [CDJ-3000, DJM-V10, etc]",
      "sound_system": "string",
      "lighting": "boolean",
      "additional_services": "array"
    },
    "pricing": {
      "quoted_price": "float (BRL)",
      "final_price": "float (BRL)",
      "included_services": "array",
      "extras_charged": "array with prices"
    },
    "outcome": {
      "client_satisfaction": "integer (1-5)",
      "would_recommend": "boolean",
      "testimonial": "string (optional)",
      "repeat_booking_likelihood": "float (0-1)",
      "issues_reported": "array (optional)"
    },
    "performance_metrics": {
      "set_duration": "float (hours)",
      "tracks_played": "integer",
      "crowd_engagement": "integer (1-5)",
      "technical_issues": "boolean",
      "weather_conditions": "string (optional for outdoor events)"
    }
  },

  "features_for_ml": {
    "predictive_pricing": {
      "input_features": [
        "event_type",
        "location.city",
        "location.venue_type",
        "client_profile.guest_count",
        "event_details.duration_hours",
        "event_details.music_style",
        "equipment_used.sound_system",
        "equipment_used.lighting",
        "date (month/season)",
        "date (day_of_week)",
        "date (is_holiday)"
      ],
      "target_variable": "pricing.final_price",
      "model_type": "Regression (Random Forest, XGBoost)",
      "evaluation_metrics": ["MAE", "RMSE", "R²"]
    },
    
    "recommendation_system": {
      "input_features": [
        "client_profile.age_range",
        "event_type",
        "client_profile.budget_range",
        "location.city",
        "event_details.atmosphere"
      ],
      "output": {
        "recommended_music_styles": "array",
        "recommended_venues": "array",
        "recommended_services": "array",
        "estimated_duration": "float"
      },
      "model_type": "Content-based filtering + Collaborative filtering",
      "similarity_metric": "Cosine similarity"
    },

    "lead_scoring": {
      "input_features": [
        "client_profile.budget_range",
        "event_type",
        "location.city",
        "lead_source",
        "form_completion_time",
        "number_of_questions_asked",
        "response_time_to_quote"
      ],
      "target_variable": "conversion_to_booking",
      "model_type": "Classification (Logistic Regression, XGBoost)",
      "evaluation_metrics": ["Precision", "Recall", "F1-Score", "AUC-ROC"]
    },

    "churn_prediction": {
      "input_features": [
        "outcome.client_satisfaction",
        "time_since_last_event",
        "total_events_booked",
        "average_event_value",
        "communication_frequency"
      ],
      "target_variable": "will_book_again_6months",
      "model_type": "Classification",
      "use_case": "Identify clients for retention campaigns"
    }
  },

  "data_collection_points": {
    "quotation_form": {
      "fields_collected": [
        "nome", "email", "telefone", "tipoEvento", "data",
        "local", "numeroConvidados", "orcamento", 
        "estilMusical", "atmosfera", "estruturaNecessaria"
      ],
      "enrichment": "Add timestamp, referrer, device type"
    },
    
    "post_event_survey": {
      "fields_to_collect": [
        "client_satisfaction (1-5)",
        "music_rating (1-5)",
        "would_recommend (yes/no)",
        "highlight_moment (text)",
        "improvement_suggestions (text)"
      ],
      "timing": "24-48 hours after event"
    },
    
    "crm_integration": {
      "data_points": [
        "email_open_rate",
        "whatsapp_response_time",
        "number_of_follow_ups",
        "quote_to_booking_time"
      ]
    }
  },

  "model_training_pipeline": {
    "step_1_data_collection": "Aggregate event history from forms, CRM, surveys",
    "step_2_preprocessing": "Clean data, handle missing values, encode categoricals",
    "step_3_feature_engineering": "Create derived features (season, time_to_event, etc)",
    "step_4_split": "80% train, 20% test (stratified by event_type)",
    "step_5_model_training": "Train multiple models, tune hyperparameters",
    "step_6_evaluation": "Compare models on test set",
    "step_7_deployment": "Deploy best model as API endpoint",
    "step_8_monitoring": "Track model drift, retrain quarterly"
  },

  "api_endpoints": {
    "predict_price": {
      "endpoint": "/api/ml/predict-price",
      "method": "POST",
      "input": "event details (as per schema)",
      "output": {
        "predicted_price": "float",
        "confidence_interval": "[lower, upper]",
        "price_breakdown": "object"
      }
    },
    
    "recommend_services": {
      "endpoint": "/api/ml/recommend",
      "method": "POST",
      "input": "client profile + event basics",
      "output": {
        "music_styles": "array",
        "venues": "array",
        "services": "array",
        "reasoning": "string"
      }
    },
    
    "score_lead": {
      "endpoint": "/api/ml/score-lead",
      "method": "POST",
      "input": "lead data from form",
      "output": {
        "lead_score": "float (0-100)",
        "conversion_probability": "float (0-1)",
        "priority": "enum: high|medium|low",
        "recommended_actions": "array"
      }
    }
  },

  "sample_training_data": {
    "note": "Below is sample data structure. Collect 50+ real events before training.",
    "example_events": [
      {
        "event_id": "EVT001",
        "date": "2024-12-31",
        "event_type": "reveillon",
        "location": {"city": "Trancoso", "venue_type": "praia"},
        "client_profile": {"age_range": "35-45", "budget_range": "acima_50k", "guest_count": 200},
        "event_details": {"duration_hours": 6, "music_style": ["Afro House", "Tech House"]},
        "pricing": {"final_price": 35000},
        "outcome": {"client_satisfaction": 5, "would_recommend": true}
      }
    ]
  }
}