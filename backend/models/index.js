// Database Models for Supabase
const { supabaseAdmin } = require('../config/supabase');

class DatabaseModel {
  constructor(tableName) {
    this.tableName = tableName;
  }

  async create(data) {
    const { data: result, error } = await supabaseAdmin
      .from(this.tableName)
      .insert(data)
      .select()
      .single();
    
    if (error) throw error;
    return result;
  }

  async findById(id) {
    const { data, error } = await supabaseAdmin
      .from(this.tableName)
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  }

  async findByUserId(userId) {
    const { data, error } = await supabaseAdmin
      .from(this.tableName)
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  }

  async update(id, updates) {
    const { data, error } = await supabaseAdmin
      .from(this.tableName)
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  async delete(id) {
    const { error } = await supabaseAdmin
      .from(this.tableName)
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return true;
  }

  async findAll(filters = {}) {
    let query = supabaseAdmin.from(this.tableName).select('*');
    
    Object.entries(filters).forEach(([key, value]) => {
      query = query.eq(key, value);
    });
    
    const { data, error } = await query.order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  }
}

// User Model
class User extends DatabaseModel {
  constructor() {
    super('users');
  }

  async findByEmail(email) {
    const { data, error } = await supabaseAdmin
      .from(this.tableName)
      .select('*')
      .eq('email', email)
      .single();
    
    if (error && error.code !== 'PGRST116') throw error;
    return data;
  }

  async findByGoogleId(googleId) {
    const { data, error } = await supabaseAdmin
      .from(this.tableName)
      .select('*')
      .eq('google_id', googleId)
      .single();
    
    if (error && error.code !== 'PGRST116') throw error;
    return data;
  }

  async findByGithubId(githubId) {
    const { data, error } = await supabaseAdmin
      .from(this.tableName)
      .select('*')
      .eq('github_id', githubId)
      .single();
    
    if (error && error.code !== 'PGRST116') throw error;
    return data;
  }

  async findByMicrosoftId(microsoftId) {
    const { data, error } = await supabaseAdmin
      .from(this.tableName)
      .select('*')
      .eq('microsoft_id', microsoftId)
      .single();
    
    if (error && error.code !== 'PGRST116') throw error;
    return data;
  }

  async findByDiscordId(discordId) {
    const { data, error } = await supabaseAdmin
      .from(this.tableName)
      .select('*')
      .eq('discord_id', discordId)
      .single();
    
    if (error && error.code !== 'PGRST116') throw error;
    return data;
  }

  async updateSubscriptionTier(userId, tier, apiLimit) {
    return this.update(userId, {
      subscription_tier: tier,
      api_limit: apiLimit
    });
  }
}

// Project Model
class Project extends DatabaseModel {
  constructor() {
    super('projects');
  }

  async findByUserIdAndName(userId, name) {
    const { data, error } = await supabaseAdmin
      .from(this.tableName)
      .select('*')
      .eq('user_id', userId)
      .eq('name', name)
      .single();
    
    if (error && error.code !== 'PGRST116') throw error;
    return data;
  }
}

// API Spec Model
class ApiSpec extends DatabaseModel {
  constructor() {
    super('api_specs');
  }

  async findByUserIdAndName(userId, name) {
    const { data, error } = await supabaseAdmin
      .from(this.tableName)
      .select('*')
      .eq('user_id', userId)
      .eq('name', name)
      .single();
    
    if (error && error.code !== 'PGRST116') throw error;
    return data;
  }

  async findByProjectId(projectId) {
    const { data, error } = await supabaseAdmin
      .from(this.tableName)
      .select('*')
      .eq('project_id', projectId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  }
}

// Generated Artifact Model
class GeneratedArtifact extends DatabaseModel {
  constructor() {
    super('generated_artifacts');
  }

  async findBySpecId(specId) {
    const { data, error } = await supabaseAdmin
      .from(this.tableName)
      .select('*')
      .eq('spec_id', specId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  }

  async findByTypeAndLanguage(type, language) {
    const { data, error } = await supabaseAdmin
      .from(this.tableName)
      .select('*')
      .eq('type', type)
      .eq('language', language)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  }
}

// Notification Model
class Notification extends DatabaseModel {
  constructor() {
    super('notifications');
  }

  async findUnreadByUserId(userId) {
    const { data, error } = await supabaseAdmin
      .from(this.tableName)
      .select('*')
      .eq('user_id', userId)
      .eq('read', false)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  }

  async markAsRead(id) {
    return this.update(id, { read: true });
  }

  async markAllAsRead(userId) {
    const { error } = await supabaseAdmin
      .from(this.tableName)
      .update({ read: true })
      .eq('user_id', userId)
      .eq('read', false);
    
    if (error) throw error;
    return true;
  }
}

// Subscription Model
class Subscription extends DatabaseModel {
  constructor() {
    super('subscriptions');
  }

  async findByStripeCustomerId(stripeCustomerId) {
    const { data, error } = await supabaseAdmin
      .from(this.tableName)
      .select('*')
      .eq('stripe_customer_id', stripeCustomerId)
      .single();
    
    if (error && error.code !== 'PGRST116') throw error;
    return data;
  }

  async findByStripeSubscriptionId(stripeSubscriptionId) {
    const { data, error } = await supabaseAdmin
      .from(this.tableName)
      .select('*')
      .eq('stripe_subscription_id', stripeSubscriptionId)
      .single();
    
    if (error && error.code !== 'PGRST116') throw error;
    return data;
  }
}

// API Key Model
class ApiKey extends DatabaseModel {
  constructor() {
    super('api_keys');
  }

  async findByKeyHash(keyHash) {
    const { data, error } = await supabaseAdmin
      .from(this.tableName)
      .select('*')
      .eq('key_hash', keyHash)
      .single();
    
    if (error && error.code !== 'PGRST116') throw error;
    return data;
  }

  async updateLastUsed(id) {
    return this.update(id, { last_used: new Date().toISOString() });
  }
}

// Audit Log Model
class AuditLog extends DatabaseModel {
  constructor() {
    super('audit_logs');
  }

  async log(userId, action, resourceType, resourceId, details = {}, ipAddress = null, userAgent = null) {
    return this.create({
      user_id: userId,
      action,
      resource_type: resourceType,
      resource_id: resourceId,
      details,
      ip_address: ipAddress,
      user_agent: userAgent
    });
  }

  async findByUserId(userId, limit = 100) {
    const { data, error } = await supabaseAdmin
      .from(this.tableName)
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit);
    
    if (error) throw error;
    return data;
  }
}

module.exports = {
  User,
  Project,
  ApiSpec,
  GeneratedArtifact,
  Notification,
  Subscription,
  ApiKey,
  AuditLog
};
